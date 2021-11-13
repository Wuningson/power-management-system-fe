import { Dispatch } from 'redux';
import * as types from './types';
import ReduxStore from '../utils/store';

class AuthActionsCreator {
  static dispatch: Dispatch<types.AuthenticationActions> = ReduxStore.dispatch;

  static authenticate(user: User) {
    this.dispatch({
      type: 'AUTHENTICATED',
      user
    });
  }

  static unAuthenticate() {
    localStorage.removeItem('userId');
    localStorage.removeItem('token');
    localStorage.removeItem('type');

    this.dispatch({
      type: types.UNAUTHENTICATED
    });
  }
}

export default AuthActionsCreator;
