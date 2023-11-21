import TransactionActionTypes from "./transaction.types";

export const fetchTransactionStart = () => ({
    type: TransactionActionTypes.FETCH_TRANSACTION_START,
});

export const fetchTransactionSuccess = transactions => ({
    type: TransactionActionTypes.FETCH_TRANSACTION_SUCCESS,
    payload: transactions 
});

export const fetchTransactionFailure = error => ({
    type: TransactionActionTypes.FETCH_TRANSACTION_FAILURE,
    payload: error
});

