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

export const setBalance = balance => ({
    type: UserActionTypes.SET_BALANCE,
    payload: balance 
});

export const setEthereum = amount => ({
    type: UserActionTypes.SET_ETHEREUM,
    payload: amount 
});

export const setVolume = amount => ({
    type: UserActionTypes.SET_VOLUME,
    payload: amount 
});

export const signOut = () => ({
    type: UserActionTypes.SIGN_OUT,
});


