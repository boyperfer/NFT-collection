import UserActionTypes from "./user.types";

export const fetchUserStart = () => ({
    type: UserActionTypes.FETCH_USER_START,
});

export const fetchUserSuccess = user => ({
    type: UserActionTypes.FETCH_USER_SUCCESS,
    payload: user 
});

export const fetchUserFailure = error => ({
    type: UserActionTypes.FETCH_USER_FAILURE,
    payload: error
});

export const setCurrentUser = user => ({
    type: UserActionTypes.SET_CURRENT_USER,
    payload: user  
});

export const signOut = () => ({
    type: UserActionTypes.SIGN_OUT,
});


