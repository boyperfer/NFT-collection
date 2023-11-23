import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigate} from 'react-router';

import {selectNFTtoBuy} from '../../redux/nft/nft.selectors';
import {selectCurrentUser} from '../../redux/user/user.selectors';
import {toggleBuying} from '../../redux/transaction/transaction.actions';
import {selectCollections} from '../../redux/collection/collection.selectors';

import {setBalance, setEthereum, setVolume} from '../../redux/user/user.actions';

import CustomButton from '../custom-buttons/custom-button.component';

import {getContractByID} from '../../redux/collection/collection.utils';

import {
	PopupCheckoutContainer,
	TableContainer,
	PayContainer,
	TextContainer,
	TableWrab,
} from './popup-checkout.styles';

const PopupCheckout = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const nftTobuy = useSelector(selectNFTtoBuy);
	const currentUser = useSelector(selectCurrentUser);
	const collections = useSelector(selectCollections);

	const {commission_rate, trader_id, balance, ethereum_balance} = currentUser;
	const {price, nft_id, collection_id, ownership_id} = nftTobuy;
	const seller_id = ownership_id;

	const contract_address = getContractByID(collections, collection_id);

	const [ethereumPrice, setEthereumPrice] = useState('');
	const usdCommission = (commission_rate * ethereumPrice).toFixed(2)

	useEffect(() => {
		const apiUrl = 'https://api.coinbase.com/v2/prices/ETH-USD/spot';
		fetch(apiUrl)
			.then(response => response.json())
			.then(({data}) => {
				setEthereumPrice(data.amount);
			})
			.catch(error => {
				console.error('Error fetching Ethereum price:', error);
			});
	}, []);

	const handleClick = commissionType => {
		const commissionFee = commissionType == 'ETH' ? commission_rate : usdCommission;
		if (commissionType == 'ETH' && ethereum_balance < price + commission_rate) {
			alert('You do not have enough ethereum');
		} else if (commissionType == 'USD' && (ethereum_balance < price || balance < usdCommission)) {
			alert('You do not have enough ethereum or USD');
		} else {
			fetch(`http://localhost:3002/transaction/${trader_id}`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({commissionFee, commissionType,
				 contract_address, nft_id, price, seller_id}),
			})
				.then(response => response.json())
				.then(data => {
					if (data.success) {
						dispatch(toggleBuying());
						if (commissionType == "USD") {
							dispatch(setBalance(balance - usdCommission))
							dispatch(setEthereum(ethereum_balance - price))
						} else {
							dispatch(setEthereum(ethereum_balance - price - commission_rate))
						}
						dispatch(setVolume(price))
						alert("The transaction successes")
						navigate('/');
					} else {
						alert('The transaction was failed');
					}
				})
				.catch(error => {
					console.error('Error:', error);
				});
		}
	};

	return (
		<PopupCheckoutContainer>
			<TableWrab>
				<TableContainer>
					<PayContainer>
						<h4>Commission In Ethereum</h4>
						<h4>Total is </h4>
						<TextContainer> {(price + commission_rate).toFixed(4)} ETH</TextContainer>
						<TextContainer> $0 USD</TextContainer>
						<CustomButton onClick={() => handleClick('ETH')}> Pay </CustomButton>
					</PayContainer>
					<PayContainer>
						<h4>Commission In USD </h4>
						<h4>Total is </h4>
						<TextContainer>{price} ETH </TextContainer>
						<TextContainer> ${usdCommission} USD</TextContainer>
						<CustomButton onClick={() => handleClick('USD')}> Pay </CustomButton>
					</PayContainer>
				</TableContainer>
				<CustomButton onClick={() => dispatch(toggleBuying())}> Cancel </CustomButton>
			</TableWrab>
		</PopupCheckoutContainer>
	);
};

export default PopupCheckout;
