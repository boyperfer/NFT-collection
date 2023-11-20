import CollectionActionTypes from "./collection.types";

export const fetchCollectionStart = () => ({
    type: CollectionActionTypes.FETCH_COLLECTION_START,
});

export const fetchCollectionSuccess = collection => ({
    type: CollectionActionTypes.FETCH_COLLECTION_SUCCESS,
    payload: collection 
});

export const fetchCollectionFailure = error => ({
    type: CollectionActionTypes.FETCH_COLLECTION_FAILURE,
    payload: error
});
