import {useSelector} from 'react-redux';

import {getContractByID, getNameByCollectionID } from '../../redux/collection/collection.utils';
import {selectCollections} from '../../redux/collection/collection.selectors';
import {selectNFTtoBuy} from '../../redux/nft/nft.selectors';
import {selectUsers} from '../../redux/user/user.selectors';

import Header from '../../components/header/header.component';

import {NFTContainer, NFTHeader, NFTContent, NFTDetail, TextContainer} from './nft-checkout.styles';
import { shortenAddress } from '../../utils';

const NFTCheckout = () => {
	const nftTobuy = useSelector(selectNFTtoBuy);
	const collections = useSelector(selectCollections);
	const users = useSelector(selectUsers);

	const {price, token_id, url_image, collection_id, ownership_id} = nftTobuy;
	const name = getNameByCollectionID(collections, collection_id);
	const contract = getContractByID(collections, collection_id);
	const addr = shortenAddress(contract);
	const {first_name, last_name} = users[ownership_id];
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
					<TextContainer><strong>Price :</strong> {price} ETH  </TextContainer>
					<TextContainer><strong>Owner :</strong> {first_name} {last_name}  </TextContainer>
				</NFTDetail>
			</NFTContent>
		</NFTContainer>
	);
};

export default NFTCheckout;
