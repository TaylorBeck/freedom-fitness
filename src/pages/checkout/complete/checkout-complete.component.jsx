import React from 'react';

import './checkout-complete.styles.scss';

const CheckoutCompletePage = (props) => {
  const checkoutState = props.location.state;
  const { stripeToken, price, deliveryDate } = checkoutState;
  const { card } = stripeToken;

  const handlePrint = () => {
    window.print();
  }

  return (
    <div className='checkout-complete-container'>
      <h1>Thank you, {card.name}!</h1>
      <h2>Your order is now complete.</h2>
      <h3>Order #{stripeToken.created} - Total Price: ${price.toFixed(2)}</h3>
      <p>You will receive your package by <strong>{deliveryDate.toDateString()}</strong>.</p>
      <p>Please <button onClick={handlePrint}>print</button> this page for your records.</p>
    </div>
  );
};

export default CheckoutCompletePage;
