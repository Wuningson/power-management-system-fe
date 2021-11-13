import { combineReducers } from 'redux';
import auth from './auth';
import alert from './alert';

const rootReducer = combineReducers({
  auth,
  alert
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
