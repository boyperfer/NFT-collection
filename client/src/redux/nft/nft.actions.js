import NFTActionTypes from "./nft.types";

export const fetchNFTStart = () => ({
    type: NFTActionTypes.FETCH_NFT_START,
});

export const fetchNFTSuccess = collection => ({
    type: NFTActionTypes.FETCH_NFT_SUCCESS,
    payload: collection 
});

export const fetchNFTFailure = error => ({
    type: NFTActionTypes.FETCH_NFT_FAILURE,
    payload: error
});

export const filterNFT = nftID => ({
    type: NFTActionTypes.FILTER_NFT,
    payload: nftID 
}) 

export const buyNFT = nft => ({
    type: NFTActionTypes.BUY_NFT,
    payload: nft
}) 

