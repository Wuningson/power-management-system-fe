import { Dispatch } from 'react';
import * as types from './types';
import { v4 as uuid } from 'uuid';
import ReduxStore from '../utils/store';

class AlertsActionsCreator {
  static dispatch: Dispatch<types.AlertActions> = ReduxStore.dispatch;

  static setAlert(payload: Alert, number = 5000) {
    const id = uuid();
    payload.id = id;
    this.dispatch({
      type: 'SET_ALERT',
      alert: payload
    });
    setTimeout(() => this.removeAlert(id), number);
  }

  static removeAlert(id: string) {
    this.dispatch({
      type: 'REMOVE_ALERT',
      id
    });
  }
}

export default AlertsActionsCreator;
