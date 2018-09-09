import React, { Component } from 'react';

import signupPageValidator from './validator';
import SignupPage from '../../components/SignupPage';

class SignupPageContainer extends Component {
  render() {
    return (
      <SignupPage
        validator={signupPageValidator}
      />
    );
  }
}

export default SignupPageContainer;
