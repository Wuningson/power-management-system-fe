import axios from 'axios';
import AlertsActionsCreator from '../actions/AlertActionsCreator';
import LoadingActionsCreator from '../actions/LoadingActionsCreator';

export default class BaseAPIService {
  static instance = axios.create({
    baseURL: 'https://final-project-power.herokuapp.com/api'
  });
  static authInterceptor: number;

  static config = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  };

  static useAuthInterceptor() {
    this.authInterceptor = this.instance.interceptors.request.use((config) => {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${localStorage.getItem('token')}`
      };

      return config;
    });
  }

  static removeAuthInterceptor() {
    this.instance.interceptors.request.eject(this.authInterceptor);
  }

  static errorHandler(err: any) {
    let message = 'Could not complete your request try later';
    if (axios.isAxiosError(err)) {
      message =
        err.response?.status !== 500
          ? err.response?.data.message || message
          : message;
    }

    AlertsActionsCreator.setAlert({ type: 'error', message: message });
    LoadingActionsCreator.setLoading(false);
  }
}
