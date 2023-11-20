import NFTActionTypes from "./nft.types";
import {filteredNFTsUtil} from './nft.utils';

const INITIAL_STATE = {
    isFetching: true,
    nfts: [],
	filteredNFTs: [],
    message: ''
};

const nftReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case NFTActionTypes.FETCH_NFT_START:
            return {
                ...state,
                isFetching: true
            };
        case NFTActionTypes.FETCH_NFT_SUCCESS:
            return {
                ...state,
                isFetching: false,
                nfts: action.payload
            };
        case NFTActionTypes.FETCH_NFT_FAILURE:
            return {
                ...state,
                isFetching: false,
                message: action.payload
            };
		case NFTActionTypes.FILTER_NFT:
			return {
				...state,
				filteredNFTs: filteredNFTsUtil(state.nfts, action.payload)
			}
        default:
            return state;
    }
};

export default nftReducer;

