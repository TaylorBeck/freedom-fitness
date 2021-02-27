export const addItemToCart = (cartItems, cartItemToAdd) => {
  // Use find to get first match - the same cartItem should not exist more than once
  const existingCartItem = cartItems.find(
    cartItem => cartItem.id === cartItemToAdd.id
  );

  if (existingCartItem) {
    return cartItems.map(cartItem =>
      cartItem.id === cartItemToAdd.id
      ? { ...cartItem, quantity: cartItem.quantity + 1 }
      : cartItem
    )
  }

  // Item being added for first time. Initial cart item quanitity is 1
  return [...cartItems, { ...cartItemToAdd, quantity: 1 }];
};
