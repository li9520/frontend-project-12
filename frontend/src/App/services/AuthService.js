import $api from '../http';

// eslint-disable-next-line functional/no-class
class AuthService {
  static async login(username, password) {
    return $api.post('/login', { username, password });
  }

  static async registration(userName, password) {
    return $api.post('/signup', { userName, password });
  }
}

export default AuthService;
