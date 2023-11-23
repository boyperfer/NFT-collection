import TransactionActionTypes from "./transaction.types";

export const fetchPaymentTransactionStart = () => ({
    type: TransactionActionTypes.FETCH_PAYMENT_TRANSACTION_START,
});

export const fetchPaymentTransactionSuccess = transactions => ({
    type: TransactionActionTypes.FETCH_PAYMENT_TRANSACTION_SUCCESS,
    payload: transactions 
});

export const fetchPaymentTransactionFailure = error => ({
    type: TransactionActionTypes.FETCH_PAYMENT_TRANSACTION_FAILURE,
    payload: error
});

export const fetchNFTTransactionStart = () => ({
    type: TransactionActionTypes.FETCH_NFT_TRANSACTION_START,
});

export const fetchNFTTransactionSuccess = transactions => ({
    type: TransactionActionTypes.FETCH_NFT_TRANSACTION_SUCCESS,
    payload: transactions 
});

export const fetchNFTTransactionFailure = error => ({
    type: TransactionActionTypes.FETCH_NFT_TRANSACTION_FAILURE,
    payload: error
});

export const toggleBuying = () => ({
    type: TransactionActionTypes.TOGGLE_BUYING,
});

