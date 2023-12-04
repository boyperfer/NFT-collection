import {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getContractByID, getNameByCollectionID} from '../../redux/collection/collection.utils';
import {selectCollections} from '../../redux/collection/collection.selectors';
import {selectNFTtoBuy} from '../../redux/nft/nft.selectors';
import {selectCurrentUser, selectUsers} from '../../redux/user/user.selectors';
import Header from '../../components/header/header.component';
import {shortenAddress} from '../../utils.js';
import CustomButton from '../custom-buttons/custom-button.component';
import PopupCheckout from '../popup-checkout/popup-checkout.component';
import {selectIsBuying} from '../../redux/transaction/transaction.selectors';
import {toggleBuying} from '../../redux/transaction/transaction.actions';
import SearchBox from '../search-box/search-box.component';
import {NFTContainer, NFTHeader, NFTContent, NFTDetail, TextContainer, OwnedContainer} from './nft-checkout.styles';

const NFTCheckout = () => {
	const dispatch = useDispatch();
	const nftTobuy = useSelector(selectNFTtoBuy);
	const collections = useSelector(selectCollections);
	const users = useSelector(selectUsers);
	const currentUser = useSelector(selectCurrentUser);
	const isBuying = useSelector(selectIsBuying);

	const {price, token_id, url_image, collection_id, ownership_id} = nftTobuy;
	const {first_name, last_name} = users[ownership_id];
	const {trader_id} = currentUser;

	const isOwned = ownership_id == trader_id;

	const name = getNameByCollectionID(collections, collection_id);
	const contract = getContractByID(collections, collection_id);
	const addr = shortenAddress(contract);

	const {commission_rate} = currentUser;

	const [password, setPassword] = useState('');

	const [isAuthorized, setIsAuthorized] = useState(false);

	const handleChange = event => {
		const {value} = event.target;
		setPassword(value);
	};

	console.log(password);
	const [ethereumPrice, setEthereumPrice] = useState('');
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

	const handleClick = event => {
		// Send login request to the server
		fetch(`http://localhost:3002/password/${trader_id}`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({password}),
		})
			.then(response => response.json())
			.then(data => {
				console.log(data);
				if (data.success) {
					setIsAuthorized(true);
				} else {
					alert('your username or password is incorrect');
				}

				console.log(data.result[0].trader_id);
				// Handle the login response accordingly
				// For simplicity, just logging the response to the console
			})
			.catch(error => {
				console.error('Error:', error);
			});
	};

	return (
		<NFTContainer>
			<Header/>
			<NFTHeader>
				<img
					alt={`NFT ${token_id}`}
					src={`${url_image}`}
					height = 'auto'
					width = '100%'
				/>
			</NFTHeader>
			<NFTContent>
				<NFTDetail>
					<TextContainer><strong>Name :</strong> {name}  </TextContainer>
					<TextContainer><strong>Token :</strong> {token_id}  </TextContainer>
					<TextContainer><strong>contract :</strong> {addr}  </TextContainer>
					<TextContainer><strong>Price :</strong> {price.toFixed(4)} ETH  </TextContainer>
					<TextContainer><strong>Owner :</strong> {first_name} {last_name}  </TextContainer>
					<TextContainer><strong>Commission fee:</strong> {commission_rate} ETH </TextContainer>
					{
						isOwned ? <OwnedContainer>Owned</OwnedContainer>
							: (
								<div>
									{
										!isAuthorized ? (
											<div>
												<h3> Please enter your password </h3>
												<SearchBox onChangeHandler={handleChange} type={'password'} placeholder={'password'}/>
												<CustomButton onClick={() => handleClick()}>Verify</CustomButton>
											</div>
										) : 
									<CustomButton onClick={() => {dispatch(toggleBuying())}}>
										Buy
									</CustomButton>
									}
								</div>
							)
					}
					{
						isBuying ? <PopupCheckout/> : <div/>
					}
				</NFTDetail>
			</NFTContent>
		</NFTContainer>
	);
};

export default NFTCheckout;
