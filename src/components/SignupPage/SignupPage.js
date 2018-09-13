import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

import ActionButton from '../ActionButton';
import LoadingPageContent from '../LoadingPageContent';
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

  setPassword = (event) => {
    console.log('event.target.value', event.target.value);
  }

  setValueToField = (field) => (event) => {
    const { value } = event.target;
    const isPristine = false;

    this.setState(prevState => ({
      [field]: {
        ...prevState[field],
        isPristine,
        value,
      },
    }), () => {
      const { constraints } = this.props;
      const error = this.props.validator.validate[field](value, constraints);
      this.setState(prevState => ({
        [field]: {
          ...prevState[field],
          error: error.message,
        },
      }));
    });
  }

  render() {
    return (
      <Fragment>
        {this.props.isLoading &&
          <LoadingPageContent />
        }

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
              onChange={this.setValueToField('email')}
              placeholder='cr7@adidas.com'
              value={this.state.email.value}
            />

            <TextInput
              error={this.state.username.error}
              isRequired={true}
              isPristine={this.state.username.isPristine}
              label='Username'
              note={this.props.constraints ? `Máximo de ${this.props.constraints.username.maxlength} caractéres`: ''}
              onChange={this.setValueToField('username')}
              placeholder='@rborcat'
              value={this.state.username.value}
            />

            <TextInput
              error={this.state.password.error}
              isRequired={true}
              isPristine={this.state.password.isPristine}
              label='Senha'
              note={this.props.constraints ? this.props.constraints.password.rules : ''}
              onChange={() => null} // TODO
              type='password'
              value={this.state.password.value}
            />

            <TextInput
              error={this.state.confirmPassword.error}
              isRequired={true}
              isPristine={this.state.confirmPassword.isPristine}
              label='Confirmar senha'
              onChange={this.setConfirmPassword} // TODO
              type='password'
              value={this.state.confirmPassword.value}
            />

            {/* TODO: Add variant for "isDisabled" on "ActionButton" */}
            <ActionButton
              colorName='hotpink'
              text='Continuar'
            />
          </form>
        </div>
      </Fragment>
    );
  }
}

SignupPage.propTypes = {
  constraints: PropTypes.shape({
    password: PropTypes.shape({
      rules: PropTypes.string.isRequired,
    }),
    username: PropTypes.shape({
      maxlength: PropTypes.number.isRequired,
    }),
  }),
  isLoading: PropTypes.bool.isRequired,
  validator: PropTypes.shape({
    validate: PropTypes.shape({
      email: PropTypes.func.isRequired,
      username: PropTypes.func.isRequired,
    })
  }),
};

export default SignupPage;
