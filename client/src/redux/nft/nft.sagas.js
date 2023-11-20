import {takeLatest, put, call} from 'redux-saga/effects';
import axios from 'axios';
import { fetchNFTSuccess, fetchNFTFailure } from './nft.actions';
import NFTActionTypes from './nft.types';

function * fetchNFT() {
	try {
		const instance = axios.create({
			baseURL: 'http://localhost:3002', // Set your desired port here
		});
		const nfts = yield call(instance.get, '/api/getNFTs'); // Adjust the API endpoint as needed
		yield put(fetchNFTSuccess(nfts.data));
	} catch (error) {
		yield put(fetchNFTFailure(error.message));
	}
}

export function * fetchNFTasync() {
	yield takeLatest(NFTActionTypes.FETCH_NFT_START, fetchNFT);
}

