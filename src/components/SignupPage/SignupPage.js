import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

import ActionButton from '../ActionButton';
import ErrorPage from '../ErrorPage';
import TextInput from '../TextInput';
import './SignupPage.styles.css';

class SignupPage extends Component {
  DEFAULT = {
    STATE_FOR_FIELD: {
      error: '',
      isPristine: true,
      isRequired: true,
      value: '',
    },
  };
  state = {
    confirmPassword: this.DEFAULT.STATE_FOR_FIELD,
    email: this.DEFAULT.STATE_FOR_FIELD,
    page: {
      error: '',
      isSubmitting: false,
      retry: null,
    },
    password: this.DEFAULT.STATE_FOR_FIELD,
    username: this.DEFAULT.STATE_FOR_FIELD,
  };

  get form() {
    return {
      // Returns an array where each item corresponds to a form field key.
      fields: () => Object.keys(this.state)
        .filter(key => (key !== 'page')),

      hasErrors: () => {
        return this.form.fields()
          .some(key => {
            const field = this.state[key];
            return (
              (field.isRequired && field.isPristine) ||
              (field.isRequired && !field.isPristine && !!field.error)
            );
          });
      },
    }
  }

  get user() {
    const { email, password, username } = this.state;
    return {
      email: email.value,
      password: password.value,
      username: username.value,
    };
  }

  resetConfirmPassword = () => {
    const { password, confirmPassword } = this.state;
    const doesPasswordsMatch = (password.value === confirmPassword.value);
    if (!doesPasswordsMatch) {
      this.setState({
        confirmPassword: this.DEFAULT.STATE_FOR_FIELD,
      });
    }
  }

  setErrorToField = (field, error, others = {}) => {
    this.setState(prevState => ({
      [field]: {
        ...prevState[field],
        error: error.message,
        isPristine: false,
      },
      page: {
        ...prevState.page,
        isSubmitting: false,
      }
    }), others.callback);
  }

  setErrorToPage = (error, retry) => {
    this.setState({
      page: {
        error: error.message,
        isSubmitting: false,
        retry,
      },
    });
  }

  setValueToField = (field) => (event) => {
    const { value } = event.target;
    this.setState(prevState => ({
      [field]: {
        ...prevState[field],
        value,
      },
    }));
  }

  submit = () => {
    this.setState(prevState => ({
      page: {
        ...prevState.page,
        error: '',
        isSubmitting: true,
      },
    }), async () => {
      try {
        await this.props.onSubmit(this.user);
        // [TODO-2]: Render a "page.success" component which you can click "on board me" or "go to matches page".
        // NOTE: This "page.success" needs to have the neymar gif.
      } catch(err) {
        const { ERRORS } = this.props.validator;
        const { code, field } = err;

        let error = ERRORS[code];
        if (error) return this.setErrorToField(field, error);

        const retry = this.submit;
        error = ERRORS.UNMAPPED_ERROR;
        this.setErrorToPage(error, retry);
      }
    });
  }

  validateField = (field, others = {}) => (event) => {
    const { constraints } = this.props;
    const {
      [field]: { value },
    } = this.state;

    const error = this.props.validator.validate[field](value, constraints, others);
    this.setErrorToField(field, error, others);
  }

  render() {
    if (!!this.state.page.error) {
      return (<ErrorPage
        error={this.state.page.error}
        retry={this.state.page.retry}
      />);
    }

    return (
      <Fragment>
        <div className='SignupPage shared-props-for-page'>
          <div className='title-container'>
            <p className='title'>Registrar-se</p>
          </div>

          <form className='form'>
            <TextInput
              {...this.state.email}

              label='Email'
              onChange={this.setValueToField('email')}
              onBlur={this.validateField('email')}
              placeholder='cr7@adidas.com'
            />

            <TextInput
              {...this.state.username}

              label='Username'
              note={this.props.constraints ? `Máximo de ${this.props.constraints.username.maxlength} caractéres`: ''}
              onChange={this.setValueToField('username')}
              onBlur={this.validateField('username')}
              placeholder='@rborcat'
            />

            <TextInput
              {...this.state.password}

              label='Senha'
              note={this.props.constraints ? this.props.constraints.password.rules : ''}
              onChange={this.setValueToField('password')}
              onBlur={this.validateField('password', { callback: this.resetConfirmPassword })}
              type='password'
            />

            <TextInput
              {...this.state.confirmPassword}

              label='Confirmar senha'
              onChange={this.setValueToField('confirmPassword')}
              onBlur={this.validateField('confirmPassword', { password: { ...this.state.password } })}
              type='password'
            />

            <ActionButton
              colorName='hotpink'
              isDisabled={this.form.hasErrors()}
              isLoading={this.state.page.isSubmitting}
              onClick={this.submit}
              text='Continuar'
            />
          </form>
        </div>
      </Fragment>
    );
  }
}

SignupPage.propTypes = {
  // [TODO-1]: Probably refactor this and lift it up to the container.
  API: PropTypes.shape({
    signup: PropTypes.func.isRequired,
  }),
  authenticate: PropTypes.func.isRequired,

  // NOTE: Used by the "validator".
  constraints: PropTypes.shape({
    password: PropTypes.shape({
      stringRegex: PropTypes.string.isRequired,
      rules: PropTypes.string.isRequired,
    }),
    username: PropTypes.shape({
      maxlength: PropTypes.number.isRequired,
    }),
    expirationDate: PropTypes.string.isRequired,
  }),

  validator: PropTypes.shape({
    ERRORS: PropTypes.shape({
      EMAIL_ALREADY_IN_USE: PropTypes.shape({
        message: PropTypes.string.isRequired,
      }).isRequired,
      UNMAPPED_ERROR: PropTypes.shape({
        message: PropTypes.string.isRequired,
      }).isRequired,
      USERNAME_ALREADY_IN_USE: PropTypes.shape({
        message: PropTypes.string.isRequired,
      }).isRequired,
    }),
    validate: PropTypes.shape({
      confirmPassword: PropTypes.func.isRequired,
      email: PropTypes.func.isRequired,
      password: PropTypes.func.isRequired,
      username: PropTypes.func.isRequired,
    })
  }),
};

export default SignupPage;
