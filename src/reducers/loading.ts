import * as types from '../actions/types';

const initialState: boolean = false;

const reducer = (
  state = initialState,
  action: types.LoadingAction
): boolean => {
  switch (action.type) {
    case 'SET_LOADING':
      return action.value;

    default:
      return state;
  }
};

export default reducer;
