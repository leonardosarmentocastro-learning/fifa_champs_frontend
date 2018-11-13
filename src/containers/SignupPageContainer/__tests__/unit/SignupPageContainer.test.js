import React from 'react';
import { mount, shallow } from 'enzyme';
// import { Provider as ReduxProvider } from 'react-redux';
// import { MemoryRouter as Router } from 'react-router-dom';

// import { ducks } from '../../../../redux';
import { SignupPageContainer } from '../../SignupPageContainer';

describe('[unit-test] SignupPageContainer', () => {
  const mocks = {
    actions: {
      setAuthorizationToken: () => null,
      setConstraints: () => null,
    },
    props: {
      signupAPI: {
        getConstraints: () => null,
        signup: () => null,
      },
      signupValidator: {},
      store: {
        user: {},
      },
    },
  };
  const specs = {
    constraints: {
      expirationDate: '',
      password: {
        rules: '',
        stringRegex: '',
      },
      username: {
        maxlength: 1,
      },
    },
  };

  describe('[method] fetchUsersConstraints', () => {
    fit('must fetch "constraints" if they are not present on the "application state"', () => {
      mocks.props.signupAPI.getConstraints = async () => await specs.constraints;
      const wrapper = mount(
        <SignupPageContainer
          {...mocks.actions}
          {...mocks.props}
        />
      );

      // wrapper.update();
      // console.log('### wrapper.instance', wrapper.instance());
      console.log('### wrapper.state', wrapper.update().state());

      // console.log('### where is my console log');
      // const wrapper = mount(
      //   <Router>
      //     <ReduxProvider store={ducks.store}>
      //       <SignupPageContainer {...mocks} />
      //     </ReduxProvider>
      //   </Router>
      // );

      // console.log('### wrapper.state', wrapper.find(SignupPageContainer).length);
    });

    it('must fetch "constraints" if they have expired', () => {
      expect('TODO').toBe(false);
    });

    it('must return "contraints" from the "application store" if they exist and haven\'t expired', () => {
      expect('TODO').toBe(false);
    });
  });

  describe('[method] goToMyProfile', () => {
    it('must redirect the user to "my profile" page', () => {
      expect('TODO').toBe(false);
    });
  });

  describe('[method] goToResultsPage', () => {
    it('must redirect the user to "results" page', () => {
      expect('TODO').toBe(false);
    });
  });

  describe('[method] initialize', () => {
    it('[on-success] must set "users constraints" on the "application state"', () => {
      expect('TODO').toBe(false);
    });

    it('[on-success] must remove the "loading" indicator and show the "signup page" after it has finished initializing', () => {
      expect('TODO').toBe(false);
    });

    it('[on-error] must show an "error page" and hide the "loading" indicator', () => {
      expect('TODO').toBe(false);
    });

    it('[on-error] must show an "error page" when receiving an response from the server', () => {
      expect('TODO').toBe(false);
    });

    it('[on-error] must show an "error page" when not receiving an response from the server', () => {
      expect('TODO').toBe(false);
    });

    it('[on-error] must show an "error page", giving the option to "retry" the initialization again', () => {
      expect('TODO').toBe(false);
    });
  });

  describe('[method] onSubmit', () => {
    it('must "signup" the user and store his authentication token on the application store', () => {
      expect('TODO').toBe(false);
    });
  });
});

