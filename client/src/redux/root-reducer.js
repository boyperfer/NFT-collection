import { combineReducers } from 'redux';

import collectionReducer from './collection/collection.reducer';
import nftReducer from './nft/nft.reducer';
import transactionReducer from './transaction/transaction.reducer';
import userReducer from './user/user.reducer';

const rootReducer = combineReducers({
    collection: collectionReducer,
	nft: nftReducer,
	user: userReducer,
	transaction: transactionReducer
});

export default rootReducer;
