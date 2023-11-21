import { createSelector } from 'reselect';

const selectUser = ({ user }) => user;

export const selectIsFetchingUsers = createSelector(
    [selectUser],
    ({ isFetching }) => isFetching
);

export const selectUsers = createSelector(
    [selectUser],
    ({ users }) => users 
);

export const selectCurrentUser = createSelector(
    [selectUser],
    ({ currentUser }) => currentUser 
);

export const selectIsSignIn = createSelector(
    [selectUser],
    ({ isSignin }) => isSignin
);

