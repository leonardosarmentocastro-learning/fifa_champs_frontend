import React, { Component } from 'react';

import { TextInput } from '../TextInput';
import './SignupPage.styles.css';

class SignupPage extends Component {
  render() {
    return (
      <div className='SignupPage shared-props-for-page'>
        <div className='title-container'>
          <p className='title'>Registrar-se</p>
        </div>

        <form className='form'>
          {/* TODO: Slack display name  */}
          <TextInput />

          {/* TODO: password  */}
          <TextInput />

          {/* TODO: confirm password  */}
          <TextInput />
        </form>
      </div>
    );
  }
}

export default SignupPage;
