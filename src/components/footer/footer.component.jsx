import React from 'react';
import { Link } from 'react-router-dom';

import { ReactComponent as GithubLogo } from '../../assets/github.svg';

import './footer.styles.scss';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const githubLink = 'https://github.com/TaylorBeck/freedom-fitness';
  return (
    <div className='footer'>
      <div className='copyright'>
        <span>&copy; {currentYear} Freedom Fit. All Rights Reserved.</span>
      </div>
      <div className='socials-container'>
        <a className='github-logo' href={githubLink}><GithubLogo/></a>
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
