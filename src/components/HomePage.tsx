import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../utils/store';
import { Redirect } from 'react-router-dom';

const HomePage: React.FC = () => {
  const { type } = useSelector((state: RootState) => state.auth);

  return type === 'customer' ? (
    <Redirect to={`/customer`} />
  ) : (
    <Redirect to={`/employee`} />
  );
};

export default HomePage;
