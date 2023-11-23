import {takeLatest, put, call} from 'redux-saga/effects';
import axios from 'axios';
import { 
	fetchPaymentTransactionSuccess, 
	fetchPaymentTransactionFailure, 
	fetchNFTTransactionSuccess, 
	fetchNFTTransactionFailure
} from './transaction.actions';
import TransactionActionTypes from './transaction.types';

function * fetchPaymentTransaction() {
	try {
		const instance = axios.create({
			baseURL: 'http://localhost:3002', // Set your desired port here
		});
		const transactions = yield call(instance.get, '/api/getPaymentTransactions'); // Adjust the API endpoint as needed
		yield put(fetchPaymentTransactionSuccess(transactions.data));
	} catch (error) {
		yield put(fetchPaymentTransactionFailure(error.message));
	}
}

export function * fetchPaymentTransactionAsync() {
	yield takeLatest(TransactionActionTypes.FETCH_PAYMENT_TRANSACTION_START, fetchPaymentTransaction);
}

function * fetchNFTTransaction() {
	try {
		const instance = axios.create({
			baseURL: 'http://localhost:3002', // Set your desired port here
		});
		const transactions = yield call(instance.get, '/api/getNFTTransactions'); // Adjust the API endpoint as needed
		yield put(fetchNFTTransactionSuccess(transactions.data));
	} catch (error) {
		yield put(fetchNFTTransactionFailure(error.message));
	}
}

export function * fetchNFTTransactionAsync() {
	yield takeLatest(TransactionActionTypes.FETCH_NFT_TRANSACTION_START, fetchNFTTransaction);
}



