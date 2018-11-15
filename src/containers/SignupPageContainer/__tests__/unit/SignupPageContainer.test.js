import React from 'react';
import { shallow } from 'enzyme';
import { DateTime } from 'luxon';

import { signupValidator } from '../../';
import SignupPage from '../../../../components/SignupPage';
import { SignupPageContainer } from '../../SignupPageContainer';
import ErrorPage from '../../../../components/ErrorPage';
import LoadingPageContent from '../../../../components/LoadingPageContent';

const DEFAULT = {
  mocks: {
    actions: {
      setAuthorizationToken: () => null,
      setConstraints: () => null,
    },
    props: {
      history: [],
      signupAPI: {
        getConstraints: () => null,
        signup: () => null,
      },
      signupValidator: { ...signupValidator },
    },
    store: {
      constraints: null,
      user: {},
    },
  },
  specs: {
    authorizationToken: '123.jwt.token',
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
    user: {
      email: 'user@email.com',
      password: 123,
      username: 'username',
    },
  },
};
const helper = {
  getComponentInstance(mocks = DEFAULT.mocks) {
    const wrapper = this.getComponentWrapper(mocks);
    const component = wrapper.instance();

    return component;
  },
  getComponentWrapper: (mocks = DEFAULT.mocks) => {
    const wrapper = shallow(
      <SignupPageContainer
        {...mocks.actions}
        {...mocks.props}
        {...mocks.store}
      />
    );

    return wrapper;
  },
};

describe('[unit-test] SignupPageContainer', () => {
  describe('initial render', () => {
    it('must show a "loading" indicator, hiding the "signup page" until it has finished initializing', () => {
      const mocks = { ...DEFAULT.mocks };
      const wrapper = helper.getComponentWrapper(mocks);

      expect(wrapper.find(LoadingPageContent)).toHaveLength(1);
      expect(wrapper.find(SignupPage)).toHaveLength(0);
    });
  });

  describe('[method] fetchUsersConstraints', () => {
    let mocks, specs;

    beforeEach(() => {
      mocks = { ...DEFAULT.mocks };
      specs = { ...DEFAULT.specs };

      mocks.props.signupAPI.getConstraints = async () => await specs.constraints;
    });

    it('must fetch "constraints" if they are not present on the "application store"', async () => {
      mocks.store.constraints = null;
      const component = helper.getComponentInstance(mocks);

      const constraints = await component.fetchUsersConstraints();
      expect(constraints).toEqual(specs.constraints);
    });

    it('must fetch "constraints" if they have expired', async () => {
      mocks.store.constraints = specs.constraints;
      mocks.store.constraints.expirationDate = DateTime.local().minus({ hour: 1 }).toISO();
      const component = helper.getComponentInstance(mocks);

      const constraints = await component.fetchUsersConstraints();
      expect(constraints).toEqual(specs.constraints);
    });

    it('must return "contraints" from the "application store" if they exist and haven\'t expired', async () => {
      mocks.store.constraints = specs.constraints;
      mocks.store.constraints.expirationDate = DateTime.local().plus({ hour: 1 }).toISO();
      const component = helper.getComponentInstance(mocks);

      const constraints = await component.fetchUsersConstraints();
      expect(constraints).toEqual(specs.constraints);
    });
  });

  describe.skip('[method] goToMyProfile', () => {
    it('must redirect the user to "my profile" page', () => {
      expect('TODO').toBe(false);
    });
  });

  describe('[method] goToResultsPage', () => {
    it('must redirect the user to "results" page', () => {
      const mocks = { ...DEFAULT.mocks };
      const component = helper.getComponentInstance(mocks);
      component.goToResultsPage();

      expect(component.props.history).toContain('/results'); // TODO: Constants for routes.
    });
  });

  describe('[method] initialize', () => {
    let mocks, specs;

    beforeEach(() => {
      mocks = { ...DEFAULT.mocks };
      specs = { ...DEFAULT.specs };
    });

    it('[on-success] must set "users constraints" on the "application store"', async () => {
      mocks.actions.setConstraints = jest.fn();
      const component = helper.getComponentInstance(mocks);
      component.fetchUsersConstraints = async () => await specs.constraints;

      await component.initialize();
      expect(mocks.actions.setConstraints).toHaveBeenCalledWith(specs.constraints);
    });

    it('[on-success] must hide the "loading" indicator and show the "signup page" after it has finished initializing', async () => {
      const wrapper = helper.getComponentWrapper(mocks);
      const component = wrapper.instance();
      component.fetchUsersConstraints = async () => await specs.constraints;

      await component.initialize();
      expect(wrapper.find(LoadingPageContent)).toHaveLength(0);
      expect(wrapper.find(SignupPage)).toHaveLength(1);
    });

    it('[on-error] must show an "error page" and hide the "loading" indicator', async () => {
      const wrapper = helper.getComponentWrapper(mocks);
      const component = wrapper.instance();
      component.fetchUsersConstraints = async () => { throw new Error(); };

      await component.initialize();
      expect(wrapper.find(ErrorPage)).toHaveLength(1);
      expect(component.state.page.error).not.toBeNull();
    });

    it('[on-error] must show an "error page" with an proper error message when receiving an response from the server', async () => {
      const wrapper = helper.getComponentWrapper(mocks);
      const component = wrapper.instance();
      component.fetchUsersConstraints = async () => { throw { response: 'some HTTP RESPONSE complex object' }; };

      await component.initialize();
      expect(wrapper.find(ErrorPage)).toHaveLength(1);
      expect(component.state.page.error).toEqual(signupValidator.ERRORS.UNMAPPED_ERROR.message);
    });

    it('[on-error] must show an "error page" with an proper error message when not receiving an response from the server', async () => {
      const wrapper = helper.getComponentWrapper(mocks);
      const component = wrapper.instance();
      component.fetchUsersConstraints = async () => { throw new Error(); };

      await component.initialize();
      expect(wrapper.find(ErrorPage)).toHaveLength(1);
      expect(component.state.page.error).toEqual(signupValidator.ERRORS.SERVER_NOT_REACHABLE.message);
    });

    it('[on-error] must show an "error page", giving the option to "retry" the initialization again', async () => {
      const wrapper = helper.getComponentWrapper(mocks);
      const component = wrapper.instance();
      component.fetchUsersConstraints = async () => { throw new Error(); };

      await component.initialize();
      expect(wrapper.find(ErrorPage)).toHaveLength(1);
      expect(component.state.page.retry).toEqual(component.initialize);
    });
  });

  describe('[method] onSubmit', () => {
    let mocks, specs;

    beforeEach(() => {
      mocks = { ...DEFAULT.mocks };
      specs = { ...DEFAULT.specs };
    });

    it('must "signup" the user and store his authentication token on the application store', async () => {
      mocks.actions.setAuthorizationToken = jest.fn();
      mocks.props.signupAPI.signup = async () => specs.authorizationToken;
      const component = helper.getComponentInstance(mocks);

      await component.onSubmit(specs.user);
      expect(mocks.actions.setAuthorizationToken).toHaveBeenCalledWith(specs.authorizationToken);
    });
  });
});
