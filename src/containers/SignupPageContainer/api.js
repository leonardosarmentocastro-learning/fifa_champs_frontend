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
  }
};

export default signupAPI;
