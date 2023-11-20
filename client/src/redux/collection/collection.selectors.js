import { createSelector } from 'reselect';

const selectCollection = ({ collection }) => collection;

export const selectIsFetchingCollection = createSelector(
    [selectCollection],
    ({ isFetching }) => isFetching
);

export const selectCollections = createSelector(
    [selectCollection],
    ({ collection }) => collection 
);
