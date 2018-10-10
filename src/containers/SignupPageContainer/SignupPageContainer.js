import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { userActions } from '../../redux/ducks/user';
import ErrorPage from '../../components/ErrorPage';
import LoadingPageContent from '../../components/LoadingPageContent';
import SignupPage from '../../components/SignupPage';

class SignupPageContainer extends Component {
  state = {
    constraints: null,
    page: {
      error: '',
      isLoading: true,
      retry: null,
    },
  };

  componentDidMount = () => {
    this.initialize();
  }

  authenticate = (token) => {
    this.props.setAuthorizationToken(token);
    // TODO: change route.
  }

  initialize = async () => {
    try {
      const constraints = await this.props.signupService.fetchUsersConstraints();
      this.setState({
        constraints,
        page: {
          isLoading: false,
        },
      });
    } catch (err) {
      const { ERRORS } = this.props.signupValidator;
      const retry = this.initialize;

      const hasReceivedResponseFromServer = Boolean(err.response);
      const error = (hasReceivedResponseFromServer ? ERRORS.UNMAPPED_ERROR : ERRORS.SERVER_NOT_REACHABLE);
      this.setState({
        page: {
          error: error.message,
          isLoading: false,
          retry,
        },
      });
    }
  }

  render() {
    if (!!this.state.page.error) {
      return (<ErrorPage
        error={this.state.page.error}
        retry={this.state.page.retry}
      />);
    }

    if (this.state.page.isLoading) {
      return (
        <LoadingPageContent />
      );
    }

    return (
      <SignupPage
        // [TODO-1]: Probably refactor this and avoid passing down to the component.
        API={this.props.signupAPI}
        authenticate={this.authenticate}

        constraints={this.state.constraints}
        validator={this.props.signupValidator}
      />
    );
  }
}

SignupPageContainer.propTypes = {
  signupAPI: PropTypes.object.isRequired,
  signupService: PropTypes.shape({
    fetchUsersConstraints: PropTypes.func.isRequired,
  }),
  signupValidator: PropTypes.shape({
    SERVER_NOT_REACHABLE: PropTypes.string.isRequired,
    UNMAPPED_ERROR: PropTypes.string.isRequired,
  }),
  setAuthorizationToken: PropTypes.func.isRequired,
};

const { setAuthorizationToken } = userActions;
export default connect(null, {
  setAuthorizationToken
})(SignupPageContainer);
