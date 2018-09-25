import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

import ActionButton from '../ActionButton';
import LoadingPageContent from '../LoadingPageContent';
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
    constraints: null,
    email: this.DEFAULT.STATE_FOR_FIELD,
    page: {
      error: '',
      isLoading: true,
      isSubmitting: false,
    },
    password: this.DEFAULT.STATE_FOR_FIELD,
    username: this.DEFAULT.STATE_FOR_FIELD,
  };

  get form() {
    return {
      // Returns an array where each item corresponds to a form field key.
      fields: () => Object.keys(this.state)
        .filter(key => (key !== 'page' && key !== 'constraints')),

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

  componentDidMount = async () => {
    // TODO: UI for unmapped page error.
    const constraints = await this.props.service.fetchUsersConstraints();
    const isLoading = false;

    this.setState(prevState => ({
      constraints,
      page: {
        ...prevState.page,
        isLoading
      },
    }));
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
    }), others.callback);
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
    const isSubmitting = true;
    this.setState(prevState => ({
      page: {
        ...prevState.page,
        isSubmitting,
      },
    }), async () => {
      try {
        const token = await this.props.API.signup(this.user);
        console.log('### TODO: FIRE AUTHENTICATION PROCESS.', token);
        // this.props.service.authenticate(token); // TODO: Fire authentication process.

      } catch(err) {
        const { ERRORS } = this.props.validator;

        let { code, field } = err;
        let error = ERRORS[code];
        if (!error) {
          // TODO: UI for unmapped page error.
          error = ERRORS.UNMAPPED_ERROR;
          field = 'page';
        }

        this.setErrorToField(field, error);
      }
    });
  }

  validateField = (field, others = {}) => (event) => {
    const {
      constraints,
      [field]: { value },
    } = this.state;

    const error = this.props.validator.validate[field](value, constraints, others);
    this.setErrorToField(field, error, others);
  }

  render() {
    return (
      <Fragment>
        {this.state.page.isLoading &&
          <LoadingPageContent />
        }

        <div className='SignupPage shared-props-for-page'>
          <div className='title-container'>
            <p className='title'>Registrar-se</p>
          </div>

          <form className='form'>
            <TextInput
              error={this.state.email.error}
              isRequired={this.state.email.isRequired}
              isPristine={this.state.email.isPristine}
              label='Email'
              onChange={this.setValueToField('email')}
              onBlur={this.validateField('email')}
              placeholder='cr7@adidas.com'
              value={this.state.email.value}
            />

            <TextInput
              error={this.state.username.error}
              isRequired={this.state.username.isRequired}
              isPristine={this.state.username.isPristine}
              label='Username'
              note={this.state.constraints ? `Máximo de ${this.state.constraints.username.maxlength} caractéres`: ''}
              onChange={this.setValueToField('username')}
              onBlur={this.validateField('username')}
              placeholder='@rborcat'
              value={this.state.username.value}
            />

            <TextInput
              error={this.state.password.error}
              isRequired={this.state.password.isRequired}
              isPristine={this.state.password.isPristine}
              label='Senha'
              note={this.state.constraints ? this.state.constraints.password.rules : ''}
              onChange={this.setValueToField('password')}
              onBlur={this.validateField('password', { callback: this.resetConfirmPassword })}
              type='password'
              value={this.state.password.value}
            />

            <TextInput
              error={this.state.confirmPassword.error}
              isRequired={this.state.confirmPassword.isRequired}
              isPristine={this.state.confirmPassword.isPristine}
              label='Confirmar senha'
              onChange={this.setValueToField('confirmPassword')}
              onBlur={this.validateField('confirmPassword', { password: { ...this.state.password } })}
              type='password'
              value={this.state.confirmPassword.value}
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
  API: PropTypes.shape({
    signup: PropTypes.func.isRequired,
  }),
  service: PropTypes.shape({
    authenticate: PropTypes.func.isRequired, // TODO: Fire authentication process.
    fetchUsersConstraints: PropTypes.func.isRequired,
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
