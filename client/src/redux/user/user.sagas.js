import {takeLatest, put, call} from 'redux-saga/effects';
import axios from 'axios';
import { fetchUserSuccess, fetchUserFailure } from './user.actions';
import UserActionTypes from './user.types';

function * fetchUser() {
	try {
		const instance = axios.create({
			baseURL: 'http://localhost:3002', // Set your desired port here
		});
		const users = yield call(instance.get, '/api/getTraders'); // Adjust the API endpoint as needed
		yield put(fetchUserSuccess(users.data));
	} catch (error) {
		yield put(fetchUserFailure(error.message));
	}
}

export function * fetchUserAsync() {
	yield takeLatest(UserActionTypes.FETCH_USER_START, fetchUser);
}


