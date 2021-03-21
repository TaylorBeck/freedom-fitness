import React from 'react';

import './checkout-complete.styles.scss';

const CheckoutCompletePage = (props) => {
  const checkoutState = props.location.state;
  const { token, price, deliveryDate } = checkoutState;
  const { card } = token;

  const handlePrint = () => {
    window.print();
  }

  return (
    <div className='checkout-complete-container'>
      <h1>Order #{token.created}</h1>
      <h2>Thank you, {card.name}! Your order is now complete.</h2>
      <h3>Total Price: ${price.toFixed(2)}</h3>
      <p>You will receive your package by <strong>{deliveryDate.toDateString()}</strong>.</p>
      <p className='do-not-print'>Please <button onClick={handlePrint}>print</button> this page for your records.</p>
    </div>
  );
};

export default CheckoutCompletePage;
