import types from './types';

const setAuthorizationToken = (token) => ({
  type: types.SET_AUTHORIZATION_TOKEN,
  payload: { token },
});

export default {
  setAuthorizationToken,
};
