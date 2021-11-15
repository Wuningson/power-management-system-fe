export default class BaseAPIService {
  static baseUrl = 'https://final-project-power.herokuapp.com/api';
  static config = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  };
}
