import { takeLatest, call, put } from 'redux-saga/effects';

import {
  firestore,
  convertCollectionsSnapshotToMap
} from '../../firebase/firebase.utils';

import {
  fetchCollectionsSuccess,
  fetchCollectionsFailure
} from './shop.actions';

import ShopActionTypes from './shop.types';

export function* fetchCollectionsAsync() {
  yield console.log('fetchCollectionsAsync FIRED');

  try {
    const collectionRef = firestore.collection('collections');
    const snapshot = yield collectionRef.get();
    // SUCCESS
    const collectionsMap = yield call(convertCollectionsSnapshotToMap, snapshot);
    yield put(fetchCollectionsSuccess(collectionsMap));
  } catch(error) {
    // FAILURE
    yield put(fetchCollectionsFailure(error.message));
  }
}

export function* fetchCollectionsStart() {
  // listens for the latest FETCH_COLLECTIONS_START action, allowing only 1 action to run at a time
  yield takeLatest(
    ShopActionTypes.FETCH_COLLECTIONS_START,
    fetchCollectionsAsync
  );
}
