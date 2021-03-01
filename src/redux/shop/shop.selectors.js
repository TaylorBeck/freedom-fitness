import { createSelector } from 'reselect';
import memoize from 'lodash.memoize';

const selectShop = state => state.shop;

export const selectShopCollections = createSelector(
  [selectShop],
  shop => shop.collections
);

// Returns a memoized selector that you must pass state into
// Example: selectShopCollection(collectionUrlParam)(state)
export const selectShopCollection = memoize(collectionUrlParam =>
  createSelector(
    [selectShopCollections],
    collections => collections[collectionUrlParam]
  )
);
