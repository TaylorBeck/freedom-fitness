import { createSelector } from 'reselect';
import memoize from 'lodash.memoize';

const selectShop = state => state.shop;

export const selectShopCollections = createSelector(
  [selectShop],
  shop => shop.collections
);

// Returns an array of collections (see shop.data)
export const selectShopCollectionsForPreview = createSelector(
  [selectShopCollections],
  collections => Object.values(collections)
);

// Returns a memoized selector that you must pass state into
// Example: selectShopCollection(collectionUrlParam)(state)
export const selectShopCollection = memoize(collectionUrlParam => {
  return createSelector(
    [selectShopCollections],
    collections => collections[collectionUrlParam]
  )
});