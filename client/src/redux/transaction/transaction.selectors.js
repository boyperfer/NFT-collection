import { createSelector } from 'reselect';

const selectTransaction = ({ transaction }) => transaction;

export const selectIsFetchingTransactions = createSelector(
    [selectTransaction],
    ({ isFetching }) => isFetching
);

export const selectIsBuying = createSelector(
    [selectTransaction],
    ({ isBuying }) => isBuying 
);

export const selectTransactions = createSelector(
    [selectTransaction],
    ({ transactions }) => transactions 
);

export const selectNFTTransactions = createSelector(
    [selectTransaction],
    ({ nftTransactions }) => nftTransactions 
);

