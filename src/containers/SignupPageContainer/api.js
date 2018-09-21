import axios from 'axios';

import ENVIRONMENT_VARIABLES from '../../internals';

const signupAPI = {
  API: (() => {
    const { backend: { ip, port } } = ENVIRONMENT_VARIABLES;
    const instance = axios.create({
      baseURL: `http://${ip}:${port}/api/users`,
    });

    return instance;
  })(),

  async getConstraints() {
    const response = await this.API.get('/constraints');
    const { data: constraints } = response;

    return constraints;
  },

  async signup(user) {
    const response = await this.API.post('/sign-up', user)
      .catch(error => {
        const err = error.response.data; // Refers to the response body.
        throw err;
      });

    const { headers } = response;
    const token = headers.authorization;
    return token;
  }
};

export default signupAPI;
