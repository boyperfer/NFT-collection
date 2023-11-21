import {useEffect, useState} from 'react';

import {useParams} from 'react-router-dom';

import {useSelector, useDispatch} from 'react-redux';

import {selectFilteredNFTs, selectIsFetchingNFTs, selectNFTs} from '../../redux/nft/nft.selectors';
import {selectCollections} from '../../redux/collection/collection.selectors';

import { filterNFT } from '../../redux/nft/nft.actions';

import {getCollectionIDByName} from '../../redux/collection/collection.utils';

import CardList from '../../components/card-list/card-list.component';
import SearchBox from '../../components/search-box/search-box.component';

import { CollectionContainer } from './collection.styles';
const CollectionPage = () => {
	const dispatch = useDispatch();
	const collectionName = useParams().collectionName;

	const collections = useSelector(selectCollections);
	const selectedNFTs = useSelector(selectFilteredNFTs);
	const isFetching = useSelector(selectIsFetchingNFTs);

	const nfts = useSelector(selectNFTs);

	const [searchField, setSearchField] = useState('');

	const [filteredNFTs, setFilterNFTs] = useState(selectedNFTs);

	useEffect(() => {
		dispatch(filterNFT(getCollectionIDByName(collections, collectionName)))
	}, [nfts, dispatch]);

	console.log(selectedNFTs)

	useEffect(() => {
		const newFilteredNFTsByTokenID = selectedNFTs.filter(nft => nft.token_id.toString().includes(searchField));

		setFilterNFTs(newFilteredNFTsByTokenID);
	}, [selectedNFTs, searchField]);

	const onSearchChange = event => {
		const searchFieldString = event.target.value.toLocaleLowerCase();
		setSearchField(searchFieldString);
	};

	return (
		<CollectionContainer>
			<SearchBox
				className='monsters-search-box'
				onChangeHandler={onSearchChange}
				placeholder='search token id'
			/>
			<CardList nfts={filteredNFTs} />
		</CollectionContainer>
	);
};

export default CollectionPage;
