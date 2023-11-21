import UserActionTypes from "./user.types";
import { hashObjectUser } from "./user.utils"; 

const INITIAL_STATE = {
    isFetching: true,
    users: {},
	currentUser: {},
	isSignin: false,
    message: ''
};

const userReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case UserActionTypes.FETCH_USER_START:
            return {
                ...state,
                isFetching: true
            };
        case UserActionTypes.FETCH_USER_SUCCESS:
            return {
                ...state,
                isFetching: false,
                users: hashObjectUser(action.payload)
            };
        case UserActionTypes.FETCH_USER_FAILURE:
            return {
                ...state,
                isFetching: false,
                message: action.payload
            };
		case UserActionTypes.SET_CURRENT_USER:
			return {
				...state,
				currentUser: action.payload,
				isSignin: true
			};
		case UserActionTypes.SIGN_OUT:
			return {
				...state,
				isSignin: false,
				currentUser: {}
			};
        default:
            return state;
    }
};

export default userReducer;


