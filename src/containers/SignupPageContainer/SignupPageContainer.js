import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

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

  goToMyProfile = () => console.log('### TODO: My profile page.');

  goToResultsPage = () => this.props.history.push('/results'); // TODO: Constants for routes.

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

  onSubmit = async (user) => {
    const token = await this.props.signupAPI.signup(user);
    this.props.setAuthorizationToken(token);
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
        constraints={this.state.constraints}
        goToMyProfile={this.goToMyProfile}
        goToResultsPage={this.goToResultsPage}
        onSubmit={this.onSubmit}
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
    ERRORS: PropTypes.shape({
      SERVER_NOT_REACHABLE: PropTypes.shape({
        message: PropTypes.string.isRequired,
      }).isRequired,
      UNMAPPED_ERROR: PropTypes.shape({
        message: PropTypes.string.isRequired,
      }).isRequired,
    }),
  }),
  setAuthorizationToken: PropTypes.func.isRequired,
};

const { setAuthorizationToken } = userActions;
export default withRouter(
  connect(null, {
    setAuthorizationToken
  })(SignupPageContainer)
);
