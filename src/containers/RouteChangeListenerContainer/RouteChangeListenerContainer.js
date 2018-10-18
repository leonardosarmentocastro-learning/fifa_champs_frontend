import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom'

class RouteChangeListenerContainer extends Component {
  unlisten = () => null

  componentWillMount() {
    this.props.history.listen((/* location, action */) => {
      console.log('### TODO: Fire "/me" call and update user on store.');
    });
  }

  componentWillUnmount() {
    this.unlisten();
  }

  render() {
    return (
      <Fragment>
        {this.props.children}
      </Fragment>
    );
  }
}

RouteChangeListenerContainer.propTypes = {
  history: PropTypes.object.isRequired,
};

export default withRouter(RouteChangeListenerContainer);
