import React from 'react';

import './footer.styles.scss';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <div className='footer'>
      <div className='copyright'>
        <p>&copy; {currentYear} Freedom Fit. All Rights Reserved.</p>
      </div>
      <div className='legal-links'>
        <div className='link'>
          <p>Terms of Service</p>   
        </div>
        <div className='link'>
          <p>Privacy Policy</p>
        </div>
        <div className='link'>
          <p>Shipping Policy</p>
        </div>
        <div className='link'>
          <p>Returns & Refund Policy</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
