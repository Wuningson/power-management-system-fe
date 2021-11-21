import { Dispatch } from 'react';
import * as types from './types';
import ReduxStore from '../utils/store';

class LoadingActionsCreator {
  static dispatch: Dispatch<types.LoadingAction> = ReduxStore.dispatch;

  static setLoading(payload: boolean) {
    this.dispatch({
      type: 'SET_LOADING',
      value: payload
    });
  }
}

export default LoadingActionsCreator;
