import { createSelector } from 'reselect';

const selectTransaction = ({ transaction }) => transaction;

export const selectIsFetchingTransactions = createSelector(
    [selectTransaction],
    ({ isFetching }) => isFetching
);

export const selectTransactions = createSelector(
    [selectTransaction],
    ({ transactions }) => transactions 
);

