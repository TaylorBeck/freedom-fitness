import React from 'react';
import { withRouter } from 'react-router-dom';

import './footer.styles.scss';

const Footer = ({ history }) => {
  const currentYear = new Date().getFullYear();
  return (
    <div className='footer'>
      <div className='copyright'>
        <p>&copy; {currentYear} Freedom Fit. All Rights Reserved.</p>
      </div>
      <div className='legal-links'>
        <div className='link'>
          <p onClick={() => history.push('/terms-of-service')}>Terms of Service</p>   
        </div>
        <div className='link'>
          <p onClick={() => history.push('/privacy-policy')}>Privacy Policy</p>
        </div>
        <div className='link'>
          <p>Shipping Policy</p>
        </div>
        <div className='link'>
          <p onClick={() => history.push('/return-refund-policy')}>Return & Refund Policy</p>
        </div>
      </div>
    </div>
  );
};

export default withRouter(Footer);
