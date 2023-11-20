import { all, call } from 'redux-saga/effects';

import { fetchCollectionAsync } from './collection/collection.sagas'
import { fetchNFTasync } from './nft/nft.sagas';
import {fetchUserAsync} from './user/user.sagas';

export default function* rootSaga() {
    yield all([call(fetchCollectionAsync), call(fetchNFTasync), call(fetchUserAsync)]);
}
