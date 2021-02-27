import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

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
        cartItem.name  
      )
    }
    <div className='total'>
      <span>{cartTotalPrice}</span>
    </div>
  </div>

);

const mapStateToProps = createStructuredSelector({
  cartItems: selectCartItems,
  cartTotalPrice: selectCartTotalPrice
});

export default connect(mapStateToProps)(CheckoutPage);
