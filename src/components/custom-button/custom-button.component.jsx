import React from 'react';

import './custom-button.styles.scss';

const CustomButton = ({
  children,
  isGoogleSignIn,
  inverted,
  ...otherProps
}) => {
  const classes = `${inverted ? 'inverted' : ''} ${isGoogleSignIn ? 'google-sign-in' : ''} custom-button`
  return (
    <button
      className={classes}
      {...otherProps}
    >
      {children}
    </button>
  );
};

export default CustomButton;
