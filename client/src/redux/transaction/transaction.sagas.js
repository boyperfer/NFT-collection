import {takeLatest, put, call} from 'redux-saga/effects';
import axios from 'axios';
import { fetchTransactionSuccess, fetchTransactionFailure } from './transaction.actions';
import TransactionActionTypes from './transaction.types';

function * fetchTransaction() {
	try {
		const instance = axios.create({
			baseURL: 'http://localhost:3002', // Set your desired port here
		});
		const transactions = yield call(instance.get, '/api/getTransactions'); // Adjust the API endpoint as needed
		yield put(fetchTransactionSuccess(transactions.data));
	} catch (error) {
		yield put(fetchTransactionFailure(error.message));
	}
}

export function * fetchTransactionAsync() {
	yield takeLatest(TransactionActionTypes.FETCH_TRANSACTION_START, fetchTransaction);
}



