import { Dispatch } from 'react';
import * as types from './types';
import { v4 as uuid } from 'uuid';
import ReduxStore from '../utils/store';

class AlertsActionsCreator {
  static dispatch: Dispatch<types.AlertActions> = ReduxStore.dispatch;

  static setAlert(title: string, message: string, type: AlertType) {
    const id = uuid();
    this.dispatch({
      type: 'SET_ALERT',
      alert: { id, message, type, title }
    });
  }

  static removeAlert(id: string) {
    this.dispatch({
      type: 'REMOVE_ALERT',
      id
    });
  }
}

export default AlertsActionsCreator;
