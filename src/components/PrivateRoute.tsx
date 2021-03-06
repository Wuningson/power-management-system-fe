import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Redirect, RouteProps } from 'react-router-dom';
import { RootState } from '../utils/store';

// @ts-ignore
const PrivateRoute: React.FC<RouteProps> = (props) => {
  const auth = useSelector((state: RootState) => state.auth);

  if (!auth._id) {
    return <Redirect to='/signin' />;
  }

  return <Route {...props} />;
};

export default PrivateRoute;
