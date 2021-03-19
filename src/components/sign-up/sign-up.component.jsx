import React, { useState } from 'react';
import { connect } from 'react-redux';

import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';

import { signUpStart } from '../../redux/user/user.actions';

import './sign-up.styles.scss';

const emptyUserCredentials = {
  displayName: '',
  email: '',
  password: '',
  confirmPassword: ''
};

const SignUp = ({ signUpStart }) => {
  const [userCredentials, setUserCredentials] = useState(emptyUserCredentials)
  const [errorMessage, setErrorMessage] = useState('');

  const { displayName, email, password, confirmPassword } = userCredentials;

  const handleSubmit = async event => {
    event.preventDefault();

    if (password !== confirmPassword) {
      setErrorMessage('Passwords must match. Please try again.');
    };

    try {
      signUpStart(displayName, email, password);
      setUserCredentials(emptyUserCredentials);
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  const handleChange = event => {
    const { name, value } = event.target;

    setUserCredentials({ ...userCredentials, [name]: value });
  };

  return (
    <div className='sign-up'>
      <h2 className='title'>I do not have an account</h2>
      <span>Sign up with your email and password</span>
      <form className='sign-up-form' onSubmit={handleSubmit}>
        {errorMessage ? (
          <div className='alert'>
            <span>{errorMessage}</span>
          </div>
        ) : null}
        <FormInput
          type='text'
          name='displayName'
          value={displayName}
          onChange={handleChange}
          label='Display Name'
          required
        />
        <FormInput
          type='text'
          name='email'
          value={email}
          onChange={handleChange}
          label='Email'
          required
        />
        <FormInput
          type='password'
          name='password'
          value={password}
          onChange={handleChange}
          label='Password'
          required
        />
        <FormInput
          type='password'
          name='confirmPassword'
          value={confirmPassword}
          onChange={handleChange}
          label='Confirm Password'
          required
        />
        <CustomButton type='submit'>SIGN UP</CustomButton>
      </form>
    </div>
  );
}

const mapDispatchToProps = dispatch => ({
  signUpStart: (displayName, email, password) => dispatch(signUpStart(displayName, email, password))
});

export default connect(null, mapDispatchToProps)(SignUp);
