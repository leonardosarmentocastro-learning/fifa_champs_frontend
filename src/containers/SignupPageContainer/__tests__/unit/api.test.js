import signupAPI from '../../api';
import ENVIRONMENT_VARIABLES from '../../../../internals';

describe('[unit-test] signupAPI', () => {
  afterEach(() => jest.resetAllMocks());

  describe('[property] API', () => {
    it('must be a configured "axios" instance pointing to "/api/users"', () => {
      const { backend: { ip, port } } = ENVIRONMENT_VARIABLES;
      const baseURL = `http://${ip}:${port}/api/users`;

      expect(signupAPI.API.defaults.baseURL).toBe(baseURL);
    });
  });

  describe('[method] getConstraints', () => {
    const specs = {
      response: {
        data: { imThePayloadReturnedFromBackend: true },
      },
    };

    it('must do a "[GET] /constraints" request and return its payload', async () => {
      const mock = (async url => url === '/constraints' ? await specs.response : null);
      signupAPI.API.get = jest.fn().mockImplementation(mock);

      const constraints = await signupAPI.getConstraints();
      expect(constraints).toEqual(specs.response.data);
    });
  });

  describe('[method] signup', () => {
    const specs = {
      error: {
        response: {
          data: { SOME_BACKEND_ERROR: 'SOME_BACKEND_ERROR' }
        }
      },
      response: {
        headers: { authorization: 'Bearer 123.header.123' },
      },
    };

    it('must do a "[POST] /sign-up" request and return its "authorization" header', async () => {
      const mock = (async (url) => url === '/sign-up' ? await specs.response : null);
      signupAPI.API.post = jest.fn().mockImplementation(mock);

      const user = { username: 'pretend this is the data provided on the "signup" form.' };
      const token = await signupAPI.signup(user);
      expect(token).toBe(specs.response.headers.authorization);
    });

    it('must do a "[POST] /sign-up" request and return its body in case of errors', async () => {
      const mock = (async (url) => { throw specs.error });
      signupAPI.API.post = jest.fn().mockImplementation(mock);

      const user = { email: 'pretend you found a way to pass wrong data to the backend.' };
      const error = await signupAPI.signup(user)
        .catch(err => err);
      expect(error).toBe(specs.error.response.data);
    });
  });
});
