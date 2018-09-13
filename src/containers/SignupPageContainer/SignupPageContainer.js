import React, { Component } from 'react';

import signupService from './service';
import signupPageValidator from './validator';
import SignupPage from '../../components/SignupPage';

class SignupPageContainer extends Component {
  state = {
    constraints: null,
    isLoading: true,
  };

  async componentDidMount() {
    const constraints = await signupService.getUsersConstraints();
    this.setState({ constraints, isLoading: false });
  }

  render() {
    return (
      <SignupPage
        constraints={this.state.constraints}
        isLoading={this.state.isLoading}
        validator={signupPageValidator}
      />
    );
  }
}

export default SignupPageContainer;
