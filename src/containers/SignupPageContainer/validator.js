import isEmail from 'validator/lib/isEmail';

const signupValidator = {
  ERRORS: {
    FIELD_IS_EMPTY: {
      message: 'Não pode ser vazio.',
    },
    EMAIL_IS_INVALID: {
      message: 'Formato inválido.',
    },
    EMAIL_ALREADY_IN_USE: {
      message: 'Este email já está em uso.'
    },
    PASSWORD_AND_CONFIRM_PASSWORD_DONT_MATCH: {
      message: 'As senhas não coincidem.',
    },
    PASSWORD_NOT_STRONG_ENOUGH: {
      message: 'Senha não é segura o bastante.',
    },
    USERNAME_ALREADY_IN_USE: {
      message: 'O nome escolhido já está em uso.',
    },
    UNMAPPED_ERROR: {
      message: 'Ocorreu um erro inesperado. Por favor, Tente novamente.',
    },
    USERNAME_TOO_LONG: (constraints) => ({
      message: `Não deve exceder o limite máximo de ${constraints.username.maxlength} caractéres.`,
    }),
  },
  NO_ERROR: { message: null },

  get validate() {
    return {
      confirmPassword: (confirmPassword, constraints, others) => {
        const isEmpty = !confirmPassword;
        if (isEmpty) return this.ERRORS.FIELD_IS_EMPTY;

        const { password } = others;
        const doesPasswordsMatch = (password && (confirmPassword === password.value));
        if (!doesPasswordsMatch) return this.ERRORS.PASSWORD_AND_CONFIRM_PASSWORD_DONT_MATCH;

        return this.NO_ERROR;
      },

      email: (email) => {
        const isEmpty = !email;
        if (isEmpty) return this.ERRORS.FIELD_IS_EMPTY;

        const isValidEmail = isEmail(email);
        if (!isValidEmail) return this.ERRORS.EMAIL_IS_INVALID;

        return this.NO_ERROR;
      },

      password: (password, constraints) => {
        const isEmpty = !password;
        if (isEmpty) return this.ERRORS.FIELD_IS_EMPTY;

        const { stringRegex } = constraints.password;
        const regex = new RegExp(stringRegex);
        const isPasswordStrongEnough = regex.test(password);
        if (!isPasswordStrongEnough) return this.ERRORS.PASSWORD_NOT_STRONG_ENOUGH;

        return this.NO_ERROR;
      },

      username: (username, constraints) => {
        const isEmpty = !username;
        if (isEmpty) return this.ERRORS.FIELD_IS_EMPTY;

        const isUsernameTooLong = (username.length > constraints.username.maxlength);
        if (isUsernameTooLong) return this.ERRORS.USERNAME_TOO_LONG(constraints);

        return this.NO_ERROR;
      }
    }
  },
};

export default signupValidator;
