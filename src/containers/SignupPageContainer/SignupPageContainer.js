import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { userActions } from '../../redux/ducks/user';
import signupAPI from './api';
import SignupPage from '../../components/SignupPage';
import signupService from './service';
import signupValidator from './validator';

class SignupPageContainer extends Component {
  authenticate = (token) => {
    console.log(token);
    this.props.setAuthorizationToken(token);

    // TODO: change route.
  }

  render() {
    return (
      <SignupPage
        API={signupAPI}
        authenticate={this.authenticate}
        service={signupService}
        validator={signupValidator}
      />
    );
  }
}

SignupPageContainer.propTypes = {
  setAuthorizationToken: PropTypes.func.isRequired,
};

const { setAuthorizationToken } = userActions;
export default connect(null, {
  setAuthorizationToken
})(SignupPageContainer);
