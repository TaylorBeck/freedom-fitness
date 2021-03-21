import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import CheckoutItem from '../../components/checkout-item/checkout-item.component';
import StripeCheckoutButton from '../../components/stripe-button/stripe-button.component';

import { selectCartItems, selectCartTotalPrice } from '../../redux/cart/cart.selectors';

import './checkout.styles.scss';

const CheckoutPage = ({ cartItems, cartTotalPrice }) => (
  <div className='checkout-container'>
    <div className='checkout-header'>
      <div className='header-block'>
        <span>Product</span>
      </div>
      <div className='header-block'>
        <span>Description</span>
      </div>
      <div className='header-block'>
        <span>QTY</span>
      </div>
      <div className='header-block'>
        <span>Price</span>
      </div>
      <div className='header-block'>
        <span>Remove</span>
      </div>
    </div>
    {
      cartItems.map(cartItem =>
        <CheckoutItem key={cartItem.id} cartItem={cartItem} /> 
      )
    }
    <div className='total'>
      <span>TOTAL: ${cartTotalPrice.toFixed(2)}</span>
    </div>
    <StripeCheckoutButton price={cartTotalPrice} />
    <div className='stripe-test-warning'>
      Please use this credit card information.
      <br />
      4242 4242 4242 4242 -- Expires: 01/24 -- CVV: 123
    </div>
  </div>
);

const mapStateToProps = createStructuredSelector({
  cartItems: selectCartItems,
  cartTotalPrice: selectCartTotalPrice
});

export default connect(mapStateToProps)(CheckoutPage);
