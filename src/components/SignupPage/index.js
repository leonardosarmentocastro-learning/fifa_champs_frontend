import React, { Component } from 'react';

import TextInput from '../TextInput';
import './index.styles.css';

class SignupPage extends Component {
  render() {
    return (
      <div className='signup-page shared-props-for-page'>
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