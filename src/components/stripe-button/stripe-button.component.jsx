import React from 'react';
import StripeCheckout from 'react-stripe-checkout';

const StripeCheckoutButton = ({ price }) => {
  const priceForStripe = price * 100; // Stripe takes the USD price amount in cents
  const publishableKey = 'pk_test_3hjpLOVYQu3Sv3woQzNZYPJK00PFuGJnye';

  const onToken = token => {
    console.log('Stripe Token: ', token);
    alert('Successful Payment');
  }

  return (
    <StripeCheckout
      label='Pay Now'
      name='Clothing Store'
      billingAddress
      shippingAddress
      image='https://svgshare.com/i/CUz.svg'
      description={`Your total is $${price}`}
      amount={priceForStripe}
      panelLabel='Pay Now'
      token={onToken}
      stripeKey={publishableKey}
    />
  );
};

export default StripeCheckoutButton;
// For list of StripeCheckout params, see: https://github.com/azmenak/react-stripe-checkout
