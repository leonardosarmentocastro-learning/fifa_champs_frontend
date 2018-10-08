import types from './types';

/**
 * STATE SHAPE:
 *
 * {
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

    default: {
      return user;
    }
  }
}
