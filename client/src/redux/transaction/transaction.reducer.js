import TransactionActionTypes from "./transaction.types";

const INITIAL_STATE = {
    isFetching: true,
    transactions: [],
    message: ''
};

const transactionReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case TransactionActionTypes.FETCH_TRANSACTION_START:
            return {
                ...state,
                isFetching: true
            };
        case TransactionActionTypes.FETCH_TRANSACTION_SUCCESS:
            return {
                ...state,
                isFetching: false,
                transactions: action.payload
            };
        case TransactionActionTypes.FETCH_TRANSACTION_FAILURE:
            return {
                ...state,
                isFetching: false,
                message: action.payload
            };
        default:
            return state;
    }
};

export default transactionReducer;



