import {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {useLocation, useNavigate} from 'react-router';

import {buyNFT} from '../../redux/nft/nft.actions';

import {selectCollections} from '../../redux/collection/collection.selectors';
import {getNameByCollectionID} from '../../redux/collection/collection.utils';
import {selectIsSignIn} from '../../redux/user/user.selectors';
import {AddButton, CardContainer, TextContainer, PriceContainer} from './card.styles';

const Card = ({nft}) => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const {token_id, url_image, collection_id, price} = nft;
	const location = useLocation();
	const collections = useSelector(selectCollections);
	const name = getNameByCollectionID(collections, collection_id);
	const isSignin = useSelector(selectIsSignIn);
	const [ethereumPrice, setEthereumPrice] = useState('');
	useEffect(() => {
		const apiUrl = 'https://api.coinbase.com/v2/prices/ETH-USD/spot';
		fetch(apiUrl)
			.then(response => response.json())
			.then(({data})=> {
				setEthereumPrice(data.amount);
			})
			.catch(error => {
				console.error('Error fetching Ethereum price:', error);
			});
	}, [])
	const priceInUSD = 
	console.log(ethereumPrice);
	return (
		<CardContainer>
			<img
				alt={`NFT ${token_id}`}
				src={`${url_image}`}
				height = 'auto'
				width = '100%'
			/>
			<h2>{name} {token_id}</h2>
			{
				location.pathname == '/profile'
					? (
						<PriceContainer>
							<TextContainer> {price} ETH </TextContainer>
							<TextContainer> {(price * ethereumPrice).toFixed(2)} USD </TextContainer>
						</PriceContainer>
					)
					: <AddButton onClick={() => {
						if (isSignin) {
							dispatch(buyNFT(nft));
							navigate('/checkout');
						} else {
							alert('Please Sign In');
						}
					}}>Buy</AddButton>

			}
		</CardContainer>
	);
};

export default Card;
