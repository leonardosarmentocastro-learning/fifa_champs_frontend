import { DateTime } from 'luxon';

import signupApi from './api';

const signupService = {
  get LOCAL_STORAGE_KEYS() {
    return {
      USERS_CONSTRAINTS: 'USERS_CONSTRAINTS',
    };
  },
  get getFromLocalStorage() {
    const getStringifiedJsonAsObject = (key) => JSON.parse(window.localStorage.getItem(key));
    return {
      usersConstraints: getStringifiedJsonAsObject(this.LOCAL_STORAGE_KEYS.USERS_CONSTRAINTS),
    };
  },

  // TODO: add tests.
  async getUsersConstraints() {
    let constraints = this.getFromLocalStorage.usersConstraints;
    const hasConstraintsOnLocalStorage = Boolean(constraints);
    if (!hasConstraintsOnLocalStorage) {
      constraints = await signupApi.getConstraints();
      this.usersConstraints = constraints;

      return constraints;
    }

    const expirationDate = DateTime.fromISO(constraints.expirationDate).valueOf();
    const now = DateTime.local().valueOf();
    const doesConstraintsNeedsToBeRefreshed = (now >= expirationDate);
    if (doesConstraintsNeedsToBeRefreshed) {
      constraints = await signupApi.getConstraints();
      this.usersConstraints = constraints;

      return constraints;
    }

    return constraints;
  },
  set usersConstraints(constraints) {
    const value = JSON.stringify(constraints);
    window.localStorage.setItem(this.LOCAL_STORAGE_KEYS.USERS_CONSTRAINTS, value);
  },
};

export default signupService;
