import React, { Component } from 'react';

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

export default SignupPageContainer;
