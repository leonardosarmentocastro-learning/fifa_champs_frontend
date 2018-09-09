import React, { Component } from 'react';

import ActionButton from '../ActionButton';
import TextInput from '../TextInput';
import './SignupPage.styles.css';

class SignupPage extends Component {
  state = {
    confirmPassword: {
      error: '',
      isPristine: true,
      value: '',
    },
    email: {
      error: '',
      isPristine: true,
      value: '',
    },
    form: {
      isSubmitting: false,
    },
    password: {
      error: '',
      isPristine: true,
      value: '',
    },
    username: {
      error: '',
      isPristine: true,
      value: '',
    },
  };

  setConfirmPassword = (event) => {
    console.log('event.target.value', event.target.value);
  }

  setEmail = (event) => {
    console.log('event.target.value', event.target.value);
  }

  setPassword = (event) => {
    console.log('event.target.value', event.target.value);
  }

  setUsername = (event) => {
    console.log('event.target.value', event.target.value);
  }

  render() {
    return (
      <div className='SignupPage shared-props-for-page'>
        <div className='title-container'>
          <p className='title'>Registrar-se</p>
        </div>

        <form className='form'>
          <TextInput
            error={this.state.email.error}
            isRequired={true}
            isPristine={this.state.email.isPristine}
            label='Email'
            onChange={this.setEmail}
            placeholder='cr7@adidas.com'
            value={this.state.email.value}
          />

          <TextInput
            error={this.state.username.error}
            isRequired={true}
            isPristine={this.state.username.isPristine}
            label='Username'
            note='Mínimo de 8 caractéres'
            onChange={this.setUsername}
            placeholder='@rborcat'
            value={this.state.username.value}
          />

          <TextInput
            error={this.state.password.error}
            isRequired={true}
            isPristine={this.state.password.isPristine}
            label='Senha'
            note={`Requer ao menos:
            . 8 caracteres
            . 1 caractere especial
            . 1 letra maiúscula
            . 1 letra minúscula`}
            onChange={this.setPassword}
            value={this.state.password.value}
          />

          <TextInput
            error={this.state.confirmPassword.error}
            isRequired={true}
            isPristine={this.state.confirmPassword.isPristine}
            label='Confirmar senha'
            onChange={this.setConfirmPassword}
            value={this.state.confirmPassword.value}
          />

          {/* TODO: Add variant for "isDisabled" on "ActionButton" */}
          <ActionButton
            colorName='hotpink'
            text='Continuar'
          />
        </form>
      </div>
    );
  }
}

export default SignupPage;
