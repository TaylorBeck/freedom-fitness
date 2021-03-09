import React from 'react';
import { Link } from 'react-router-dom';

import './footer.styles.scss';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <div className='footer'>
      <div className='copyright'>
        <span>&copy; {currentYear} Freedom Fit. All Rights Reserved.</span>
      </div>
      <div className='legal-links'>
        <Link className='link' to='/terms-of-service'>Terms of Service</Link>
        <Link className='link' to='/privacy-policy'>Privacy Policy</Link>
        <Link className='link' to='/shipping-policy'>Shipping Policy</Link>
        <Link className='link' to='/return-refund-policy'>Return Policy</Link>
      </div>
    </div>
  );
};

export default Footer;
