import types from './types';

/**
 * STATE SHAPE:
 *
 * {
 *    constraints: {
 *      expirationDate: string,
 *      password: {
 *        rules: string,
 *        stringRegex: string,
 *      },
 *      username: {
 *        maxlength: number,
 *      },
 *    },
 *    token: string,
 * }
 *
 */

export default function reducer(user = {}, action = {}) {
  switch (action.type) {
    case types.SET_AUTHORIZATION_TOKEN: {
      const { token } = action.payload;
      return {
        ...user,
        token,
      };
    }

    case types.SET_CONSTRAINTS: {
      const { constraints } = action.payload;
      return {
        ...user,
        constraints,
      };
    }

    default: {
      return user;
    }
  }
}
