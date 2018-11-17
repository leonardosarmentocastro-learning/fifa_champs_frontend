import React from 'react';
import { mount } from 'enzyme';

import ActionButton from '../../../ActionButton';
import ErrorPage from '../../../ErrorPage';
import { signupValidator } from '../../../../containers/SignupPageContainer' ;
import SignupPage from '../../SignupPage';
import SignupSuccessfulPage from '../../SignupSuccessfulPage';
import TextInput from '../../../TextInput';

const DEFAULT = {
  mocks: {
    props: {
      constraints: {
        password: {
          rules: 'Used only for presentation, can be anything.',
          stringRegex: '(?=^.{8,}$)((?=.*\\d)|(?=.*\\W+))(?![.\\n])(?=.*[A-Z])(?=.*[a-z]).*$',
        },
        username: {
          maxlength: 24,
        },
      },
      goToMyProfile: () => null,
      goToResultsPage: () => null,
      onSubmit: async () => new Promise(),
      validator: signupValidator,
    },
  },
};
const helper = {
  getComponentInstance(mocks = DEFAULT.mocks) {
    const wrapper = this.getComponentWrapper(mocks);
    const component = wrapper.instance();

    return component;
  },
  getComponentWrapper(mocks = DEFAULT.mocks) {
    const wrapper = mount(<SignupPage {...mocks.props} />);

    return wrapper;
  },
};

describe('[component] SignupPage', () => {
  describe('initial render', () => {
    let mocks, wrapper;

    beforeEach(() => {
      mocks = { ...DEFAULT.mocks };
      wrapper = helper.getComponentWrapper(mocks);
    });

    it('must show the "signup form", hiding the "error"/"successful" pages', () => {
      expect(wrapper.find('.SignupPage')).toHaveLength(1);
    });

    it('all "fields" must be enabled and have no value or errors', () => {
      const fields = wrapper.find(TextInput);

      fields.forEach(field => {
        const props = field.props();

        expect(props.isDisabled).toBeFalsy();
        expect(props.value).toBe('');
        expect(props.error).toBe('');
      });
    });

    it('the "action button" must be disabled', () => {
      const [actionButton] = wrapper.find(ActionButton);

      expect(actionButton).not.toBeNull();
      expect(actionButton.props.isDisabled).toBeTruthy();
    });

    it('the "action button" must not be showing the loading spinner', () => {
      const [actionButton] = wrapper.find(ActionButton);

      expect(actionButton).not.toBeNull();
      expect(actionButton.props.isLoading).toBeFalsy();
    });
  });

  describe('general functional requirements for "fields"', () => {
    const FIELDS = ['email', 'username', 'password', 'confirmPassword'];
    FIELDS.forEach(field => {
      let mocks, textInput, wrapper;

      beforeEach(() => {
        const FIELD_SELECTOR = `TextInput[id="${field}"]`;
        mocks = { ...DEFAULT.mocks };

        wrapper = helper.getComponentWrapper(mocks);
        textInput = wrapper.find(FIELD_SELECTOR);
      });

      it(`must contain an "text input" for setting "${field}"`, () => {
        expect(textInput.is(TextInput)).toBeTruthy();
      });

      it(`must set value to "${field}" field when focusing and typing on them`, () => {
        const value = 'any text value';
        textInput.find('input').simulate('change', { target: { value }});

        expect(wrapper.state(field).value).toBe(value);
      });

      it(`must validate the "${field}" field after focusing, typing and leaving it`, () => {
        textInput.find('input').simulate('blur');
        expect(wrapper.state(field).isPristine).toBeFalsy();
      });
    });
  });

  describe('functional requirements for "action button"', () => {
    let mocks, wrapper;
    const specs = {
      validDataForFields: {
        email: 'email@domain.com',
        username: '@username',
        password: '1q2w#E$R',
        confirmPassword: '1q2w#E$R',
      },
      invalidDataForFields: {
        password: '1q2w#E$R',
        confirmPassword: 'passwords-dont-match',
      },
    };
    const test = {
      simulateTypingValuesOnFields(dataForFields, wrapper) {
        Object.keys(dataForFields)
          .forEach(field => {
            const FIELD_SELECTOR = `TextInput[id="${field}"]`;
            const textInput = wrapper.find(FIELD_SELECTOR);
            const value = dataForFields[field];

            textInput.find('input').simulate('change', { target: { value } });
            textInput.find('input').simulate('blur');
          });
      },
    };

    beforeEach(() => {
      mocks = { ...DEFAULT.mocks };
      wrapper = helper.getComponentWrapper(mocks);
    });

    it('must be enabled when providing valid data for all fields', () => {
      test.simulateTypingValuesOnFields(specs.validDataForFields, wrapper);

      const actionButton = wrapper.find(ActionButton);
      expect(actionButton.props().isDisabled).toBeFalsy();
    });

    it('must be disabled while the form has errors', () => {
      test.simulateTypingValuesOnFields(specs.validDataForFields, wrapper);
      test.simulateTypingValuesOnFields(specs.invalidDataForFields, wrapper);

      const actionButton = wrapper.find(ActionButton);
      expect(actionButton.props().isDisabled).toBeTruthy();
    });
  });

  describe('functional requirements for "confirm password" field', () => {
    let mocks, textInput, wrapper;
    const field = 'confirmPassword';

    beforeEach(() => {
      const FIELD_SELECTOR = `TextInput[id="${field}"]`;
      mocks = { ...DEFAULT.mocks };

      wrapper = helper.getComponentWrapper(mocks);
      textInput = wrapper.find(FIELD_SELECTOR);
    });

    it('must display an error when typing an value and removing it completely', () => {
      textInput.find('input').simulate('change', { target: { value: 'random-password' }});
      textInput.find('input').simulate('blur');

      textInput.find('input').simulate('change', { target: { value: '' }});
      textInput.find('input').simulate('blur');

      expect(wrapper.state(field).error)
        .toBe(signupValidator.ERRORS.FIELD_IS_EMPTY.message);
    });

    it('must display an error when "password" and "confirm password" values dont match', () => {
      textInput.find('input').simulate('change', { target: { value: 'random-password' } });
      textInput.find('input').simulate('blur');

      expect(wrapper.state(field).error)
        .toBe(signupValidator.ERRORS.PASSWORD_AND_CONFIRM_PASSWORD_DONT_MATCH.message);
    });
  });

  describe('functional requirements for "email" field', () => {
    let mocks, textInput, wrapper;
    const field = 'email';

    beforeEach(() => {
      const FIELD_SELECTOR = `TextInput[id="${field}"]`;

      mocks = { ...DEFAULT.mocks };
      wrapper = helper.getComponentWrapper(mocks);
      textInput = wrapper.find(FIELD_SELECTOR);
    });

    it('must display an error when typing an value and removing it completely ', () => {
      textInput.find('input').simulate('change', { target: { value: 'email@domain.com' } });
      textInput.find('input').simulate('blur');

      textInput.find('input').simulate('change', { target: { value: '' } });
      textInput.find('input').simulate('blur');

      expect(wrapper.state(field).error)
        .toBe(signupValidator.ERRORS.FIELD_IS_EMPTY.message);
    });

    it('must display an error when providing an invalid type of email', () => {
      textInput.find('input').simulate('change', { target: { value: '123-123@!!@domain.com' } });
      textInput.find('input').simulate('blur');

      expect(wrapper.state(field).error)
        .toBe(signupValidator.ERRORS.EMAIL_IS_INVALID.message);
    });
  });

  describe('functional requirements for "password" field', () => {
    let mocks, textInput, wrapper;
    const field = 'password';

    beforeEach(() => {
      const FIELD_SELECTOR = `TextInput[id="${field}"]`;

      mocks = { ...DEFAULT.mocks };
      wrapper = helper.getComponentWrapper(mocks);
      textInput = wrapper.find(FIELD_SELECTOR);
    });

    it('must display an error when typing an value and removing it completely ', () => {
      textInput.find('input').simulate('change', { target: { value: '1q2w#E$R' } });
      textInput.find('input').simulate('blur');

      textInput.find('input').simulate('change', { target: { value: '' } });
      textInput.find('input').simulate('blur');

      expect(wrapper.state(field).error)
        .toBe(signupValidator.ERRORS.FIELD_IS_EMPTY.message);
    });

    it('must display an error when providing an value that is not strong enough', () => {
      textInput.find('input').simulate('change', { target: { value: '1234abcd' } });
      textInput.find('input').simulate('blur');

      expect(wrapper.state(field).error)
        .toBe(signupValidator.ERRORS.PASSWORD_NOT_STRONG_ENOUGH.message);
    });
  });

  describe('functional requirements for "username" field', () => {
    let mocks, textInput, wrapper;
    const field = 'username';

    beforeEach(() => {
      const FIELD_SELECTOR = `TextInput[id="${field}"]`;

      mocks = { ...DEFAULT.mocks };
      wrapper = helper.getComponentWrapper(mocks);
      textInput = wrapper.find(FIELD_SELECTOR);
    });

    it('must display an error when typing an value and removing it completely ', () => {
      textInput.find('input').simulate('change', { target: { value: '@username' } });
      textInput.find('input').simulate('blur');

      textInput.find('input').simulate('change', { target: { value: '' } });
      textInput.find('input').simulate('blur');

      expect(wrapper.state(field).error)
        .toBe(signupValidator.ERRORS.FIELD_IS_EMPTY.message);
    });

    it('must display an error when providing username that is too long', () => {
      textInput.find('input').simulate('change', { target: { value: 'jesus-christ-this-username-is-enormous' } });
      textInput.find('input').simulate('blur');

      const { constraints } = mocks.props;
      expect(wrapper.state(field).error)
        .toBe(signupValidator.ERRORS.USERNAME_TOO_LONG(constraints).message);
    });
  });

  describe('functional requirements for the "page form"', () => {
    let mocks;

    beforeEach(() => {
      mocks = { ...DEFAULT.mocks };
    });

    it('must disable all form fields while submitting', () => {
      const wrapper = helper.getComponentWrapper(mocks);
      wrapper.setState({
        page: { isSubmitting: true },
      });

      const FIELDS = ['email', 'username', 'password', 'confirmPassword'];
      FIELDS.forEach(field => {
        const FIELD_SELECTOR = `TextInput[id="${field}"]`;
        const textInput = wrapper.find(FIELD_SELECTOR);

        expect(textInput.props().isDisabled).toBeTruthy();
      });
    });

    it('must show the "loading spinner" on the "action button" while submitting', () => {
      const wrapper = helper.getComponentWrapper(mocks);
      wrapper.setState({
        page: { isSubmitting: true },
      });

      const actionButton = wrapper.find(ActionButton);
      expect(actionButton.props().isLoading).toBeTruthy();
    });

    it('must show the "signup successful page" after a sucessful form submission', () => {
      const wrapper = helper.getComponentWrapper(mocks);
      wrapper.setState({
        page: { hasCompletedSignupSuccessfully: true },
      });

      const signupSuccessfulPage = wrapper.find(SignupSuccessfulPage);
      expect(signupSuccessfulPage).toHaveLength(1);
      expect(signupSuccessfulPage.props().goToMyProfile)
        .toBe(mocks.props.goToMyProfile);
      expect(signupSuccessfulPage.props().goToResultsPage)
        .toBe(mocks.props.goToResultsPage);
    });
  });

  describe('[method] submit', () => {
    let mocks;

    beforeEach(() => {
      mocks = { ...DEFAULT.mocks };
    });

    it('must call the "onSubmit" prop function with "user" as a parameter', async () => {
      mocks.props.onSubmit = jest.fn();
      const wrapper = helper.getComponentWrapper(mocks);
      const component = wrapper.instance();
      await component.submit();

      expect(mocks.props.onSubmit).toHaveBeenCalledWith(component.user);
    });

    it('must show, on fields, mapped errors returned from the backend after an unsucessful form submission', () => {
      const BACKEND_MAPPED_ERRORS = [
        {
          code: 'EMAIL_ALREADY_IN_USE',
          field: 'email',
        },
        {
          code: 'USERNAME_ALREADY_IN_USE',
          field: 'username',
        }
      ];

      BACKEND_MAPPED_ERRORS.forEach(async backendMappedError => {
        mocks.props.onSubmit = () => { throw backendMappedError };
        const wrapper = helper.getComponentWrapper(mocks);
        const component = wrapper.instance();
        await component.submit();

        const { code, field } = backendMappedError;
        expect(wrapper.state(field).error)
          .toBe(signupValidator.ERRORS[code].message);
      });
    });

    it('must show an error page if the backend returned an unmapped error after an unsucessful form submission', async () => {
      const UNMAPPED_BACKEND_ERROR = {
        code: 'CODE_THAT_FRONTEND_DOESNT_KNOW',
      };

      mocks.props.onSubmit = () => { throw UNMAPPED_BACKEND_ERROR };
      const wrapper = helper.getComponentWrapper(mocks);
      const component = wrapper.instance();
      await component.submit();
      wrapper.update();

      const errorPage = wrapper.find(ErrorPage);
      expect(errorPage).toHaveLength(1);
      expect(errorPage.props().error)
        .toBe(signupValidator.ERRORS.UNMAPPED_ERROR.message);
      expect(errorPage.props().retry)
        .toBe(component.submit);
      expect(errorPage.props().cancel)
        .toBe(component.hideErrorPage);
    });

    it('must show the "signup successful page" when retrying the form submission after an unsucessful form submission', async () => {
      const UNMAPPED_BACKEND_ERROR = {
        code: 'ANOTHER_CODE_THAT_FRONTEND_DOESNT_KNOW',
      };

      mocks.props.onSubmit = () => { throw UNMAPPED_BACKEND_ERROR };
      const wrapper = helper.getComponentWrapper(mocks);
      const component = wrapper.instance();
      await component.submit();
      wrapper.update();
      expect(wrapper.find(ErrorPage)).toHaveLength(1);

      wrapper.setProps({
        onSubmit: async () => await 'submitted sucessful',
      });
      await component.submit();
      wrapper.update();
      expect(wrapper.find(ErrorPage)).toHaveLength(0);
      expect(wrapper.find(SignupSuccessfulPage)).toHaveLength(1);
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
