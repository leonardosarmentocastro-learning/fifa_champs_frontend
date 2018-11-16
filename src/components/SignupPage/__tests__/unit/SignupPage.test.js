describe('[component] SignupPage', () => {
  describe('initial render', () => {
    it('must show the "signup form", hiding the "error"/"successful" pages', () => {

    });

    it('all "fields" must have no value or errors', () => {

    });

    it('the "action button" must be disabled', () => {

    });

    it('the "action button" must not show the loading spinner', () => {

    });
  });

  describe('general functional requirements for "fields"', () => {
    const FIELDS = ['email', 'username', 'password', 'confirmPassword'];

    FIELDS.forEach(field => {
      it(`must contain an "field" for setting "${field}"`, () => {

      });

      it(`must set value to "${field}" field when focusing and typing on them`, () => {

      });

      it(`must validate "${field}" field after focusing, typing and leaving it`, () => {

      });
    });
  });

  describe('functional requirements for "action button"', () => {
    it('must exist in order to be able to submit the "signup form"', () => {

    });

    it('must be enabled when providing valid data for all fields', () => {

    });

    it('must be disabled while the form has errors', () => {

    });
  });

  describe('functional requirements for "confirm password" field', () => {
    it('must display an error when typing an value and removing it completely ', () => {

    });

    it('must display an error when "password" and "confirm password" values dont match', () => {

    });
  });

  describe('functional requirements for "email" field', () => {
    it('must display an error when typing an value and removing it completely ', () => {

    });

    it('must display an error when providing an invalid type of email', () => {

    });
  });

  describe('functional requirements for "password" field', () => {
    it('must display an error when typing an value and removing it completely ', () => {

    });

    it('must display an error when providing an value that is not strong enough', () => {

    });
  });

  describe('functional requirements for "username" field', () => {
    it('must display an error when typing an value and removing it completely ', () => {

    });

    it('must display an error when providing username that is too long', () => {

    });
  });

  describe('functional requirements for the "page form"', () => {
    it('must disable all fields while submitting', () => {
      // TODO: this even needs implementation.
    });

    it('must show the "loading spinner" on the "action button" while submitting', () => {

    });

    // TODO: continue writing the test cases (like "show the signup successful page" etc).
    it('', () => {

    });
  });

  describe('[method] submit', () => {
    it('must call the "onSubmit" prop function with "user" as a parameter', () => {

    });
  });

  describe('[getter] form.fields', () => {
    it('must return an array contaning all the keys that corresponds to input fields on the "signup page" form', () => {

    });
  });

  describe('[getter] form.hasErrors', () => {
    it('must return "true" if a field is required and the user havent typed any value on it', () => {

    });

    it('must return "true" if a field is required, the user has typed a value on it but it has some internal validation error', () => {

    });

    it('must return "false" if a field is required, the user has typed a value on it and has no internal validation error', () => {

    });
  });

  describe('[getter] user', () => {
    it('must map the form fields to an object which corresponds to an "user" schema expected by the backend', () => {

    });
  });
});
