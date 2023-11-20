import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Outlet } from 'react-router-dom';

import HomePage from './pages/home/home-page.component'
import Header from './components/header/header.component'

import './App.css';

import {selectIsFetchingNFTs} from './redux/nft/nft.selectors';

import { fetchNFTStart } from './redux/nft/nft.actions';
import {fetchCollectionStart} from './redux/collection/collection.actions';
import {fetchUserStart} from './redux/user/user.actions';

const App = () => {
	const dispatch = useDispatch();

	const isFetching = useSelector(selectIsFetchingNFTs)

	useEffect(() => {
		dispatch(fetchCollectionStart())
	}, [dispatch]);

	useEffect(() => {
		dispatch(fetchNFTStart());
	}, [dispatch]);

	useEffect(() => {
		dispatch(fetchUserStart());
	}, [dispatch]);
	return (
		<div className='App'>
			<h1 className='app-title'>NFT collection</h1>
			<Header/>
			<HomePage/>
			{
				!isFetching ? <Outlet/> : <div/> 
			}
		</div>
	);
};

export default App;
