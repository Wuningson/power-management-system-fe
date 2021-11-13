import * as types from '../actions/types';

const initialState: Alert[] = [];

const reducer = (state = initialState, action: types.AlertActions): Alert[] => {
  switch (action.type) {
    case 'SET_ALERT':
      return [...state, action.alert];

    case 'REMOVE_ALERT':
      return state.filter(({ id }) => id !== action.id);

    default:
      return state;
  }
};

export default reducer;
