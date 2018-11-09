import { DateTime } from 'luxon';

import signupAPI from './api';

const signupService = {
  LOCAL_STORAGE_KEYS: {
    USERS_CONSTRAINTS: 'USERS_CONSTRAINTS',
  },
  get usersConstraints() {
    const key = this.LOCAL_STORAGE_KEYS.USERS_CONSTRAINTS;
    const value = window.localStorage.getItem(key);
    return JSON.parse(value);
  },
  set usersConstraints(constraints) {
    const key = this.LOCAL_STORAGE_KEYS.USERS_CONSTRAINTS;
    const value = JSON.stringify(constraints);
    window.localStorage.setItem(key, value);
  },

  async fetchUsersConstraints() {
    const constraints = this.usersConstraints;

    const hasConstraintsOnLocalStorage = Boolean(constraints);
    if (!hasConstraintsOnLocalStorage) {
      return await this.refreshUsersContrainstsOnLocalStorage();
    }

    const expirationDate = DateTime.fromISO(constraints.expirationDate).valueOf();
    const now = DateTime.local().valueOf();
    const doesConstraintsNeedsToBeRefreshed = (now >= expirationDate);
    if (doesConstraintsNeedsToBeRefreshed) {
      return await this.refreshUsersContrainstsOnLocalStorage();
    }

    return constraints;
  },
  async refreshUsersContrainstsOnLocalStorage() {
    this.usersConstraints = await signupAPI.getConstraints();
    return this.usersConstraints;
  },
};

export default signupService;
