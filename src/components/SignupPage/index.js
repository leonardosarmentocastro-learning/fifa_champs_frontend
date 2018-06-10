import React, { Component, Fragment } from 'react';

import NavigationBar from '../NavigationBar';
import './index.styles.css';

class SignupPage extends Component {
  render() {
    return (
      <Fragment>
        <NavigationBar />

        <div className='signup-page'>
          Signup page
        </div>
      </Fragment>
    );
  }
}

export default SignupPage;