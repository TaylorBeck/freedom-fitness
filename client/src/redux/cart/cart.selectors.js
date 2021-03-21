import { createSelector } from 'reselect';

const selectCart = state => state.cart; // returns cartReducer from state

export const selectCartItems = createSelector(
  [selectCart],
  cart => cart.cartItems
);

export const selectCartHidden = createSelector(
  [selectCart],
  cart => cart.hidden
);

export const selectCartItemsCount = createSelector(
  [selectCartItems],
  cartItems =>
    cartItems.reduce(
      (accumulatedQuantity, cartItem) =>
        accumulatedQuantity + cartItem.quantity,
      0
    )
);

export const selectCartTotalPrice = createSelector(
  [selectCartItems],
  cartItems =>
    cartItems.reduce(
      (accumulatedPrice, cartItem) =>
        accumulatedPrice + (cartItem.price * cartItem.quantity),
      0
    )
);
