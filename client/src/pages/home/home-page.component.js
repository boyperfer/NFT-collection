import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { getCollectionNameByContract } from '../../redux/collection/collection.utils';

import SearchBox from '../../components/search-box/search-box.component';
import CollectionPage from '../collection/collection.component';

import CustomButton from '../../components/custom-buttons/custom-button.component';

import { HomePageContainer } from './home-page.styles';
import {selectCollections} from '../../redux/collection/collection.selectors';


const HomePage = () => {
	const [searchField, setSearchField] = useState('');
	const navigate = useNavigate();
	const collection = useSelector(selectCollections);

	const onSearchChange = (event) => {
		const searchFieldString = event.target.value.toLocaleLowerCase();
		setSearchField(searchFieldString);
	};

	return (
		<HomePageContainer>
			<SearchBox
				className='monsters-search-box'
				onChangeHandler={onSearchChange}
				placeholder='search contract'
			/>
			<CustomButton onClick={() => navigate(`/collections/${getCollectionNameByContract(collection,searchField)}`)} > search </CustomButton>
		</HomePageContainer>
	);
};

export default HomePage;

