import React from 'react';
import Bill from './components/Bill';
import Login from './components/Login';
import ReduxStore from './utils/store';
import NavBar from './components/NavBar';
import Payment from './components/Payment';
import Customer from './components/Customer';
import HomePage from './components/HomePage';
import EmployeeTab from './components/EmployeeTab';
import PaymentForm from './components/PaymentForm';
import PrivateRoute from './components/PrivateRoute';
import CreateCustomer from './components/CreateCustomer';
import CustomerDashboard from './components/CustomerDashboard';
import EmployeeDashboard from './components/EmployeeDashboard';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

const App: React.FC = () => {
  const stringUser = localStorage.getItem('user');
  if (stringUser) {
    const user = JSON.parse(stringUser) as User;
    ReduxStore.dispatch({
      type: 'AUTHENTICATED',
      user
    });
  }
  return (
    <div className='App'>
      <BrowserRouter>
        <NavBar />
        <Switch>
          <Route exact path='/signin' component={Login} />
          <PrivateRoute path='/home' component={HomePage} />
          <PrivateRoute exact path='/customer' component={CustomerDashboard} />
          <PrivateRoute exact path='/employee' component={EmployeeDashboard} />
          <PrivateRoute exact path='/employee/customers' component={Customer} />
          <PrivateRoute exact path='/customer/bills/:userId' component={Bill} />
          <PrivateRoute
            exact
            path='/customer/payments/:userId'
            component={Payment}
          />
          <PrivateRoute component={EmployeeTab} path='/employee/tab/:userId' />
          <PrivateRoute component={CreateCustomer} path='/customer/create' />
          <PrivateRoute component={PaymentForm} path='/payments/customer' />
          <Redirect to='/home' />
        </Switch>
      </BrowserRouter>
    </div>
  );
};

export default App;
