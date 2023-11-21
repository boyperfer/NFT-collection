import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router';
import { getCollectionNameByContract } from '../../redux/collection/collection.utils';

import SearchBox from '../../components/search-box/search-box.component';
import CollectionPage from '../collection/collection.component';

import CustomButton from '../../components/custom-buttons/custom-button.component';

import { HomePageContainer, SearchContainer } from './home-page.styles';
import {selectCollections} from '../../redux/collection/collection.selectors';
import {selectNFTs} from '../../redux/nft/nft.selectors';
import CardList from '../../components/card-list/card-list.component';


const HomePage = () => {
	const [searchField, setSearchField] = useState('');
	const navigate = useNavigate();
	const location = useLocation();
	const collection = useSelector(selectCollections);
	const nfts = useSelector(selectNFTs)

	const onSearchChange = (event) => {
		const searchFieldString = event.target.value.toLocaleLowerCase();
		setSearchField(searchFieldString);
	};

	console.log(location)

	return (
		<HomePageContainer>
			<SearchContainer>
				<SearchBox
					className='monsters-search-box'
					onChangeHandler={onSearchChange}
					placeholder='search contract'
				/>
				<CustomButton onClick={() => navigate(`/collections/${getCollectionNameByContract(collection,searchField)}`)} > search </CustomButton>
			</SearchContainer>
			{

				location.pathname =='/' ?  <CardList nfts={nfts}/> : null
			}
		</HomePageContainer>
	);
};

export default HomePage;

