import { shallow } from 'enzyme';

describe('[unit-test] SignupPageContainer', () => {
  describe('[method] fetchUsersConstraints', () => {
    it('must fetch "constraints" if they are not present on the "application state"', () => {

    });

    it('must fetch "constraints" if they have expired', () => {

    });

    it('must return "contraints" from the "application store" if they exist and haven\'t expired', () => {

    });
  });

  describe('[method] goToMyProfile', () => {
    it('must redirect the user to "my profile" page', () => {

    });
  });

  describe('[method] goToResultsPage', () => {
    it('must redirect the user to "results" page', () => {

    });
  });

  describe('[method] initialize', () => {
    it('[on-success] must set "users constraints" on the "application state"', () => {

    });

    it('[on-success] must remove the "loading" indicator and show the "signup page" after it has finished initializing', () => {

    });

    it('[on-error] must show an "error page" and hide the "loading" indicator', () => {

    });

    it('[on-error] must show an "error page" when receiving an response from the server', () => {

    });

    it('[on-error] must show an "error page" when not receiving an response from the server', () => {

    });

    it('[on-error] must show an "error page", giving the option to "retry" the initialization again', () => {

    });
  });

  describe('[method] onSubmit', () => {
    it('must "signup" the user and store his authentication token on the application store', () => {

    });
  });
});

