import Utils from '../utils/Utils';
import React, { useState } from 'react';
import NavBar from '../components/NavBar';
import { FiLogOut } from 'react-icons/fi';
import { useSelector } from 'react-redux';
import { RootState } from '../utils/store';
import AuthActionsCreator from '../actions/AuthActionsCreator';
import { Button, Icon, Alert, AlertIcon } from '@chakra-ui/react';
import AlertsActionsCreator from '../actions/AlertActionsCreator';
import { useHistory, useLocation, matchPath, Redirect } from 'react-router-dom';

import './dashboard.css';

export type Active = 'Dashboard' | 'Bills' | 'Payments' | 'Customers';

interface Props {
  children: React.ReactNode;
}

// @ts-ignore
const DashLayout: React.FC<Props> = (props) => {
  const state = useSelector((state: RootState) => state);
  const { firstName, lastName } = state.auth;
  const fullName = Utils.capitalize(`${firstName} ${lastName}`);

  const dismissAlert = (id: string) => (e: any) => {
    AlertsActionsCreator.removeAlert(id);
  };

  const token = localStorage.getItem('token');
  const logout = () => {
    AuthActionsCreator.unAuthenticate();
  };

  const history = useHistory();
  const handleBack = () => {
    history.goBack();
  };

  const location = useLocation();
  const matchUrl = matchPath(location.pathname, {
    path: '/employee/tab/:userId',
    exact: true,
    strict: false
  });

  const matchBills = matchPath(location.pathname, {
    path: '/customer/bills/:userId',
    exact: true,
    strict: false
  });
  const matchPaymnets = matchPath(location.pathname, {
    path: '/customer/payments/:userId',
    exact: true,
    strict: false
  });
  const matchCustomers = matchPath(location.pathname, {
    path: '/employee/customers',
    exact: true,
    strict: false
  });

  const defaultActiveOption = matchBills
    ? 'Bills'
    : matchPaymnets
    ? 'Payments'
    : matchCustomers || matchUrl
    ? 'Customers'
    : 'Dashboard';

  const [active, setActive] = useState<Active>(defaultActiveOption);

  const handleClick = (value: Active) => (e: any) => {
    console.log({ active, value });
    setActive(value);
  };

  return token ? (
    <section className='h-100 p-4 overflow-hidden bg-purple_transparent'>
      <div className='bg-primary clearfix border_radius mb-3 p-2'>
        <div className='float-end'>
          <Button
            onClick={logout}
            rightIcon={<Icon as={FiLogOut} color='white' />}
            className='bg-transparent_black_6 font-white w-100'
            type='submit'
          >
            Logout
          </Button>
        </div>

        <div className='d-flex align-items-center'>
          <div className='bg-white p-2 font-weight-800 rounded-circle float-start me-3'>
            {firstName.charAt(0)}
            {lastName.charAt(0)}
          </div>
          <h4 className='font-white font-sm-2'>{fullName}</h4>
        </div>
      </div>

      <div className='row g-0 main_body'>
        <div className='col-lg-2'>
          <NavBar active={active} handleClick={handleClick} />
        </div>
        <div className='col-lg-10'>
          <div className='main_area scroll'>
            <div className='border_bottom pb-3 mb-3'>
              {active !== 'Dashboard' || matchUrl ? (
                <Button className='float-end' onClick={handleBack}>
                  Back
                </Button>
              ) : null}
              <h1 className='font-lg-3 text-primary text-capitalize font-weight-700'>
                {active}
              </h1>
            </div>
            {state.alert.map(({ id, message, type }) => (
              <Alert key={id} status={type} onClick={dismissAlert(id!)}>
                <AlertIcon />
                {message}
              </Alert>
            ))}
            {props.children}
          </div>
        </div>
      </div>
    </section>
  ) : (
    <Redirect to='/signin' />
  );
};

export default DashLayout;
