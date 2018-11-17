import React from 'react';
import { mount } from 'enzyme';
import { DateTime } from 'luxon';

import ActionButton from '../../../ActionButton';
import { signupValidator } from '../../../../containers/SignupPageContainer' ;
import SignupPage from '../../SignupPage';
import TextInput from '../../../TextInput';

const DEFAULT = {
  mocks: {
    props: {
      // TODO: check if it is really necessary to set this object completly.
      constraints: {
        expirationDate: DateTime.local().plus({ hour: 1 }).toISO(),
        password: {
          rules: 'At least 8 characters',
          stringRegex: 'a string regex for validating password',
        },
        username: {
          maxlength: 10,
        },
      },
      goToMyProfile: () => null,
      goToResultsPage: () => null,
      onSubmit: async () => await null,
      validator: signupValidator,
    },
  },

  // TODO: check if it is really necessary to set this object completly.
  specs: {

  },
};
const helper = {
  getComponentInstance(mocks = DEFAULT.mocks) {
    const wrapper = this.getComponentWrapper(mocks);
    const component = wrapper.instance();

    return component;
  },
  getComponentWrapper(mocks = DEFAULT.mocks) {
    const wrapper = mount(<SignupPage
      {...mocks.props}
    />);

    return wrapper;
  }
}

describe('[component] SignupPage', () => {
  describe('initial render', () => {
    let mocks;

    beforeEach(() => {
      mocks = { ...DEFAULT.mocks };
    });

    it('must show the "signup form", hiding the "error"/"successful" pages', () => {
      const wrapper = helper.getComponentWrapper(mocks);
      expect(wrapper.find('.SignupPage')).toHaveLength(1);
    });

    it('all "fields" must be enabled and have no value or errors', () => {
      const wrapper = helper.getComponentWrapper(mocks);
      const fields = wrapper.find(TextInput);

      fields.forEach(field => {
        const props = field.props();

        expect(props.isDisabled).toBeFalsy();
        expect(props.value).toBe('');
        expect(props.error).toBe('');
      });
    });

    it('the "action button" must be disabled', () => {
      const wrapper = helper.getComponentWrapper(mocks);
      const [actionButton] = wrapper.find(ActionButton);

      expect(actionButton).not.toBeNull();
      expect(actionButton.props.isDisabled).toBeTruthy();
    });

    it('the "action button" must not be showing the loading spinner', () => {
      const wrapper = helper.getComponentWrapper(mocks);
      const [actionButton] = wrapper.find(ActionButton);

      expect(actionButton).not.toBeNull();
      expect(actionButton.props.isLoading).toBeFalsy();
    });
  });

  describe('general functional requirements for "fields"', () => {
    let mocks;

    beforeEach(() => {
      mocks = { ...DEFAULT.mocks };
    });

    const FIELDS = ['email', 'username', 'password', 'confirmPassword'];
    FIELDS.forEach(field => {
      const FIELD_SELECTOR = `TextInput[id="${field}"]`;
      let textInput, wrapper;

      beforeEach(() => {
        wrapper = helper.getComponentWrapper(mocks);
        textInput = wrapper.find(FIELD_SELECTOR);
      });

      it(`must contain an "text input" for setting "${field}"`, () => {
        expect(textInput.is(TextInput)).toBeTruthy();
      });

      it(`must set value to "${field}" field when focusing and typing on them`, () => {
        const value = 'any text value';
        const event = {
          target: { value },
        };
        textInput.find('input').simulate('change', event);

        const state = wrapper.update().state();
        expect(state[field].value).toBe(value);
      });

      it(`must validate the "${field}" field after focusing, typing and leaving it`, () => {
        textInput.find('input').simulate('blur');

        const state = wrapper.update().state();
        expect(state[field].isPristine).toBeFalsy();
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

    it('must show the "signup successful page" after a sucessful form submission', () => {

    });

    // EMAIL_ALREADY_IN_USE
    // USERNAME_ALREADY_IN_USE
    it('must show, on fields, mapped errors returned from the backend after an unsucessful form submission', () => {

    });

    // UNMAPPED_ERROR
    it('must show an error page if the backend returned an unmapped error after an unsucessful form submission', () => {

    });

    it('must give to the user, on the error page, the option to retry the form submission after an unsucessful form submission', () => {

    });

    it('must show the "signup successful page" when retrying the form submission after an unsucessful form submission', () => {

    });
  });

  describe('[method] submit', () => {
    it('must call the "onSubmit" prop function with "user" as a parameter', () => {

    });

    it(`must disable all form fields when the page is submitting`, () => {

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
