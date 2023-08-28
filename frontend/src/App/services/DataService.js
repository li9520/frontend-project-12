import $api from '../http';

// eslint-disable-next-line functional/no-class
class DataService {
  static async fetchData() {
    return $api.get('/data');
  }
}

export default DataService;
