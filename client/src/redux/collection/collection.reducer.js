import CollectionActionTypes from "./collection.types";
import { hashCollection } from "./collection.utils";

const INITIAL_STATE = {
    isFetching: true,
    collection: [],
    message: ''
};

const collectionReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case CollectionActionTypes.FETCH_COLLECTION_START:
            return {
                ...state,
                isFetching: true
            };
        case CollectionActionTypes.FETCH_COLLECTION_SUCCESS:
            return {
                ...state,
                isFetching: false,
                collection: action.payload
            };
        case CollectionActionTypes.FETCH_COLLECTION_FAILURE:
            return {
                ...state,
                isFetching: false,
                message: action.payload
            };
        default:
            return state;
    }
};

export default collectionReducer;
