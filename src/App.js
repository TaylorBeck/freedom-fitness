import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import GlobalStyle from './global.styles';

import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';

import Header from './components/header/header.component';
import Footer from './components/footer/footer.component';

import TermsOfService from './pages/legal/terms-of-service/terms-of-service.component';
import PrivacyPolicy from './pages/legal/privacy-policy/privacy-policy.component';
import ShippingPolicy from './pages/legal/shipping-policy/shipping-policy.component';
import ReturnRefundPolicy from './pages/legal/return-refund-policy/return-refund-policy.component';

import CheckoutPage from './pages/checkout/checkout.component';
import CheckoutCompletePage from './pages/checkout/complete/checkout-complete.component';

import { selectCurrentUser } from './redux/user/user.selectors';
import { checkUserSession } from './redux/user/user.actions';

class App extends React.Component {
  componentDidMount() {
    const { checkUserSession } = this.props;
    checkUserSession();
  }

  render() {
    return (
      <div>
        <GlobalStyle />
        <Header />
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route path='/shop' component={ShopPage} />
          <Route exact path='/checkout' component={CheckoutPage} />
          <Route exact path='/checkout/complete' component={CheckoutCompletePage} />
          <Route
            exact
            path='/signin'
            render={() =>
              this.props.currentUser ? (
                <Redirect to='/' />
              ) : (
                <SignInAndSignUpPage />
              )
            }
          />
          <Route exact path='/terms-of-service' component={TermsOfService} />
          <Route exact path='/privacy-policy' component={PrivacyPolicy} />
          <Route exact path='/shipping-policy' component={ShippingPolicy} />
          <Route exact path='/return-refund-policy' component={ReturnRefundPolicy} />
        </Switch>
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
});

const mapDispatchToProps = dispatch => ({
  checkUserSession: () => dispatch(checkUserSession())
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
