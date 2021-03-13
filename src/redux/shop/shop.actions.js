import ShopActionTypes from './shop.types';

import {
  firestore,
  convertCollectionsSnapshotToMap
} from '../../firebase/firebase.utils';

export const fetchCollectionsStart = () => ({
  type: ShopActionTypes.FETCH_COLLECTIONS_START
});

export const fetchCollectionsSuccess = collectionsMap => ({
  type: ShopActionTypes.FETCH_COLLECTIONS_SUCCESS,
  payload: collectionsMap
});

export const fetchCollectionsFailure = errorMessage => ({
  type: ShopActionTypes.FETCH_COLLECTIONS_FAILURE,
  payload: errorMessage
});

// Using thunk (redux middleware), GET shop collections or an error
export const fetchCollectionsStartAsync = () => {
  // redux-thunk middleware will call dispatched functions with the `dispatch` method as the first argument
  return dispatch => {
    // GET the shop `collections` collection reference
    const collectionRef = firestore.collection('collections');
    dispatch(fetchCollectionsStart());

    // GET the snapshot (the actual data) of the collectionRef
    collectionRef
      .get()
      .then(snapshot => {
        // SUCCESS
        const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
        dispatch(fetchCollectionsSuccess(collectionsMap));
      })
      .catch(error => {
        // FAILURE
        dispatch(fetchCollectionsFailure(error.message));
      });
  };
};
