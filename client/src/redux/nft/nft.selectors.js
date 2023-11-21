import { createSelector } from 'reselect';

const selectNFT = ({ nft }) => nft;

export const selectIsFetchingNFTs = createSelector(
    [selectNFT],
    ({ isFetching }) => isFetching
);

export const selectNFTs = createSelector(
    [selectNFT],
    ({ nfts }) => nfts 
);

export const selectFilteredNFTs = createSelector(
    [selectNFT],
    ({ filteredNFTs }) => filteredNFTs 
);

export const selectNFTtoBuy = createSelector(
    [selectNFT],
    ({ nftToBuy }) => nftToBuy 
);



