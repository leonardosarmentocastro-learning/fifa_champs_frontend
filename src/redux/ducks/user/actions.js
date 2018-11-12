import types from './types';

const setAuthorizationToken = (token) => ({
  type: types.SET_AUTHORIZATION_TOKEN,
  payload: { token },
});

const setConstraints = (constraints) => ({
  type: types.SET_CONSTRAINTS,
  payload: { constraints },
});

export default {
  setAuthorizationToken,
  setConstraints,
};
