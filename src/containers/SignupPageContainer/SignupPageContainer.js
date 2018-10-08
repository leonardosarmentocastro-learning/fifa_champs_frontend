import React, { Component } from 'react';

// TODO: Connect component to store.
// import { userActions } from '../../redux/ducks/user';
import signupAPI from './api';
import SignupPage from '../../components/SignupPage';
import signupService from './service';
import signupValidator from './validator';

class SignupPageContainer extends Component {
  render() {
    return (
      <SignupPage
        API={signupAPI}
        service={signupService}
        validator={signupValidator}
      />
    );
  }
}

// TODO: Connect component to store.
export default SignupPageContainer;
