import signupValidator from '../../validator';

describe('[unit-test] signupValidator', () => {
  describe('[method] validator.confirmPassword', () => {
    const specs = {
      constraints: null,
    };

    it('must throw an error when an empty value is provided', () => {
      const confirmPassword = '';
      const error = signupValidator.validate.confirmPassword(confirmPassword);

      expect(error).toBe(signupValidator.ERRORS.FIELD_IS_EMPTY);
    });

    it('must throw and error when "password" and "confirm password" doesnt match', () => {
      const confirmPassword = 'confirm password';
      const others = {
        password: { value: 'password' }
      };
      const error = signupValidator.validate.confirmPassword(confirmPassword, specs.constraints, others);

      expect(error).toBe(signupValidator.ERRORS.PASSWORD_AND_CONFIRM_PASSWORD_DONT_MATCH);
    });

    it('must not throw any error when all conditions are satisfied', () => {
      const confirmPassword = 'valid-password';
      const others = {
        password: { value: 'valid-password' }
      };
      const error = signupValidator.validate.confirmPassword(confirmPassword, specs.constraints, others);

      expect(error).toBe(signupValidator.NO_ERROR);
    });
  });

  describe('[method] validator.email', () => {
    it('must throw an error when an empty value is provided', () => {
      const email = '';
      const error = signupValidator.validate.email(email);

      expect(error).toBe(signupValidator.ERRORS.FIELD_IS_EMPTY);
    });

    it('must throw an error when providing an invalid email', () => {
      const invalidEmails = [
        'not-valid@1!.com',
        'invalid-email.com',
        'ok-enough-of invalid-email@please-go123.home123.com'
      ].forEach(email => {
        const error = signupValidator.validate.email(email);
        expect(error).toBe(signupValidator.ERRORS.EMAIL_IS_INVALID);
      });
    });

    it('must not throw any error when all conditions are satisfied', () => {
      const email = 'valid@email.com';
      const error = signupValidator.validate.email(email);

      expect(error).toBe(signupValidator.NO_ERROR);
    });
  });

  describe('[method] validator.password', () => {
    const specs = {
      constraints: {
        password: {
          stringRegex: '(?=^.{8,}$)((?=.*\\d)|(?=.*\\W+))(?![.\\n])(?=.*[A-Z])(?=.*[a-z]).*$',
        },
      },
    };

    it('must throw an error when an empty value is provided', () => {
      const password = '';
      const error = signupValidator.validate.password(password);

      expect(error).toBe(signupValidator.ERRORS.FIELD_IS_EMPTY);
    });

    it('must throw an error when the provided password doesnt satisfies the provided validation regex', () => {
      const password = 'my not so strong password';
      const error = signupValidator.validate.password(password, specs.constraints);

      expect(error).toBe(signupValidator.ERRORS.PASSWORD_NOT_STRONG_ENOUGH);
    });

    it('must not throw any error when all conditions are satisfied', () => {
      const password = '1q2w#E$R';
      const error = signupValidator.validate.password(password, specs.constraints);

      expect(error).toBe(signupValidator.NO_ERROR);
    });
  });

  describe('[method] validator.username', () => {
    const specs = {
      constraints: {
        username: {
          maxlength: 24,
        },
      },
    };

    it('must throw an error when an empty value is provided', () => {
      const username = '';
      const error = signupValidator.validate.username(username);

      expect(error).toBe(signupValidator.ERRORS.FIELD_IS_EMPTY);
    });

    it('must throw an error when the provided username is too long', () => {
      const username = 'Leonardo Sarmento de Castro';
      const error = signupValidator.validate.username(username, specs.constraints);

      expect(error).toEqual(signupValidator.ERRORS.USERNAME_TOO_LONG(specs.constraints));
    });

    it('must not throw any error when all conditions are satisfied', () => {
      const username = 'Leonardo Sarmento';
      const error = signupValidator.validate.username(username, specs.constraints);

      expect(error).toEqual(signupValidator.NO_ERROR);
    });
  });
});