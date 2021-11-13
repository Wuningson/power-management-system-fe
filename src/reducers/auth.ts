import * as types from '../actions/types';

const initialState: User = {} as User;

const reducer = (
  state: User = initialState,
  action: types.AuthenticationActions
): User => {
  switch (action.type) {
    case 'AUTHENTICATED':
      localStorage.setItem('userId', action.user._id);
      return action.user;

    case 'UNAUTHENTICATED':
      return {} as User;

    default:
      return state;
  }
};

export default reducer;
