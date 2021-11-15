import * as types from '../actions/types';

const initialState: User = {} as User;

const reducer = (
  state: User = initialState,
  action: types.AuthenticationActions
): User => {
  switch (action.type) {
    case 'AUTHENTICATED':
      localStorage.setItem('userId', action.user._id);
      localStorage.setItem('user', JSON.stringify(action.user));
      return action.user;

    case 'UNAUTHENTICATED':
      localStorage.removeItem('userId');
      localStorage.removeItem('token');
      localStorage.removeItem('user');

      return {} as User;

    default:
      return state;
  }
};

export default reducer;
