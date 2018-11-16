describe('[component] SignupPage', () => {
  describe('initial render', () => {

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

  // TODO: See if it is more productive to test the method or the interations on the page.
  describe('[method] hideErrorPage', () => {
    it('must hide the "error page", restoring the "signup page" to its default state', () => {

    });
  });

  // TODO: See if it is more productive to test the method or the interations on the page.
  describe('[method] resetConfirmPassword', () => {
    it('must restore the "confirm password" field to its default if both "password" and "confirm password" field\'s values match', () => {

    });

    it('must not restore the "confirm password" field to its default if "password" and "confirm password" field\'s values dont match', () => {

    });
  });

  // TODO: See if it is more productive to test the method or the interations on the page.
  describe('[method] setErrorToField', () => {
    it('must set an "error message" to the given field', () => {

    });

    it('must set the given field as not "pristine" (meaning that the field value has changed)', () => {

    });

    it('must fire a "validation callback" if provided', () => {

    });
  });

  // TODO: See if it is more productive to test the method or the interations on the page.
  describe('[method] setErrorToPage', () => {
    it('must set an error message to be displayed on the page', () => {

    });

    it('must mark the page as "not submitting" because this method is fired after submiting the form', () => {

    });

    it('must give the option to "retry" the form submission again', () => {

    });
  });

  // TODO: See if it is more productive to test the method or the interations on the page.
  describe('[method] setValueToField', () => {
    it('must map the given "event.target.value" as a "field" value', () => {

    });
  });

  // TODO: See if it is more productive to test the method or the interations on the page.
  // describe('[method] submit', () => {
  //   it('must initially mark the page as having no errors and on submitting state', () => {

  //   });
  // });

  // TODO: See if it is more productive to test the method or the interations on the page.
  // describe('[method] validateField', () => {
  //   it('must map the given "event.target.value" as a "field" value', () => {

  //   });
  // });

  describe('[interaction]', () => {

  });
});
