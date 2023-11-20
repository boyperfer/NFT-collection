import {takeLatest, put, call} from 'redux-saga/effects';
import axios from 'axios';
import {fetchCollectionSuccess, fetchCollectionFailure} from './collection.actions';
import CollectionActionTypes from './collection.types';

function * fetchCollection() {
	try {
		const instance = axios.create({
			baseURL: 'http://localhost:3002', // Set your desired port here
		});
		const collections = yield call(instance.get, '/api/getCollections'); // Adjust the API endpoint as needed
		yield put(fetchCollectionSuccess(collections.data));
	} catch (error) {
		yield put(fetchCollectionFailure(error.message));
	}
}

// Export function*

export function * fetchCollectionAsync() {
	yield takeLatest(CollectionActionTypes.FETCH_COLLECTION_START, fetchCollection);
}
