import axios from 'axios';
import AlertsActionsCreator from '../actions/AlertActionsCreator';
import LoadingActionsCreator from '../actions/LoadingActionsCreator';

export default class BaseAPIService {
  static baseUrl = 'https://final-project-power.herokuapp.com/api';
  static config = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  };

  static errorHandler(err: any) {
    let message = 'Could not complete your request try later';
    if (axios.isAxiosError(err)) {
      message =
        err.response?.status !== 500 ? err.response?.data.message : message;
    }
    AlertsActionsCreator.setAlert({ type: 'error', message: message });
    LoadingActionsCreator.setLoading(false);
  }
}
