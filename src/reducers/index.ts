import { combineReducers } from 'redux';
import auth from './auth';
import alert from './alert';
import loading from './loading';

const rootReducer = combineReducers({
  auth,
  alert,
  loading
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
