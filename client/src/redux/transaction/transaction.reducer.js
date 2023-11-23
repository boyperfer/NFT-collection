import TransactionActionTypes from "./transaction.types";

const INITIAL_STATE = {
    isFetching: true,
	isFetchingNFT: true,
    transactions: [],
	nftTransactions: [],
	isBuying: false, 
    message: ''
};

const transactionReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case TransactionActionTypes.FETCH_PAYMENT_TRANSACTION_START:
            return {
                ...state,
                isFetching: true
            };
        case TransactionActionTypes.FETCH_PAYMENT_TRANSACTION_SUCCESS:
            return {
                ...state,
                isFetching: false,
                transactions: action.payload
            };
        case TransactionActionTypes.FETCH_PAYMENT_TRANSACTION_FAILURE:
            return {
                ...state,
                isFetching: false,
                message: action.payload
            };
        case TransactionActionTypes.FETCH_NFT_TRANSACTION_START:
            return {
                ...state,
                isFetchingNFT: true
            };
        case TransactionActionTypes.FETCH_NFT_TRANSACTION_SUCCESS:
            return {
                ...state,
                isFetchingNFT: false,
                nftTransactions: action.payload
            };
        case TransactionActionTypes.FETCH_NFT_TRANSACTION_FAILURE:
            return {
                ...state,
                isFetchingNFT: false,
                message: action.payload
            };
        case TransactionActionTypes.TOGGLE_BUYING:
            return {
                ...state,
				isBuying: !state.isBuying,
            };
        default:
            return state;
    }
};

export default transactionReducer;



