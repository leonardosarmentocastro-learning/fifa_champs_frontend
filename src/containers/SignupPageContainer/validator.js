import isEmail from 'validator/lib/isEmail';

const signupPageValidator = {
  get ERRORS() {
    return {
      EMAIL_IS_EMPTY: {
        message: 'Não pode ser vazio.',
      },
      EMAIL_IS_INVALID: {
        message: 'Formato inválido.',
      },
      EMAIL_ALREADY_IN_USE: {
        message: 'Este email já está em uso.'
      },
      USERNAME_IS_EMPTY: {
        message: 'Não pode ser vazio.',
      },
      USERNAME_TOO_LONG: (constraints) => ({
        message: `Não deve exceder o limite máximo de ${constraints.username.maxlength} caractéres.`,
      }),
    };
  },
  get NO_ERROR() {
    return { message: null };
  },

  get validate() {
    return {
      email: (email) => {
        const isEmpty = !email;
        if (isEmpty) {
          const error = this.ERRORS.EMAIL_IS_EMPTY;
          return error;
        }

        const isValidEmail = isEmail(email);
        if (!isValidEmail) {
          const error = this.ERRORS.EMAIL_IS_INVALID;
          return error;
        }

        return this.NO_ERROR;
      },

      username: (username, constraints) => {
        const isEmpty = !username;
        if (isEmpty) {
          const error = this.ERRORS.USERNAME_IS_EMPTY;
          return error;
        }

        const isUsernameTooLong = (username.length > constraints.username.maxlength);
        if (isUsernameTooLong) {
          const error = this.ERRORS.USERNAME_TOO_LONG(constraints);
          return error;
        }

        return this.NO_ERROR;
      }
    }
  },
};

export default signupPageValidator;
