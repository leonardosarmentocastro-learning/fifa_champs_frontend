import React, { Component } from 'react';
import PropTypes from 'prop-types';

import signupPageValidator from './validator';
import SignupPage from '../../components/SignupPage';

class SignupPageContainer extends Component {
  state = {
    constraints: null,
    isLoading: true,
  };

  async componentDidMount() {
    const constraints = await this.props.signupService.fetchUsersConstraints();
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

SignupPageContainer.propTypes = {
  signupService: PropTypes.shape({
    fetchUsersConstraints: PropTypes.func.isRequired,
  }),
};

export default SignupPageContainer;
