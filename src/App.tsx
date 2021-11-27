import React from 'react';
import Bill from './components/Bill';
import Login from './components/Login';
import Payment from './components/Payment';
import Customer from './components/Customer';
import HomePage from './components/HomePage';
import DashLayout from './layout/DashLayout';
import EmployeeTab from './components/EmployeeTab';
import PaymentForm from './components/PaymentForm';
import CreateCustomer from './components/CreateCustomer';
import AuthActionsCreator from './actions/AuthActionsCreator';
import CustomerDashboard from './components/CustomerDashboard';
import EmployeeDashboard from './components/EmployeeDashboard';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import './cdn/b5/css/bootstrap.css';
import './cdn/css/look_css/css/look_base_v2.css';
import './cdn/css/style.css';
import AddCustomerBill from './components/AddCustomerBill';

const App: React.FC = () => {
  console.log('app');
  const stringUser = localStorage.getItem('user');
  if (stringUser) {
    const user = JSON.parse(stringUser) as User;
    AuthActionsCreator.authenticate(user);
  }
  return (
    <div className='App'>
      <BrowserRouter>
        <Switch>
          <Route exact path='/signin' component={Login} />
          <DashLayout>
            <Route exact path='/customer' component={CustomerDashboard} />
            <Route exact path='/employee' component={EmployeeDashboard} />
            <Route exact path='/employee/customers' component={Customer} />
            <Route exact path='/customer/bills/:userId' component={Bill} />
            <Route path='/home' component={HomePage} />
            <Route
              exact
              path='/customer/payments/:userId'
              component={Payment}
            />
            <Route component={EmployeeTab} path='/employee/tab/:userId' />
            <Route
              component={CreateCustomer}
              path='/employee/customers/create'
            />
            <Route component={PaymentForm} path='/payments/customer' />
            <Route
              component={AddCustomerBill}
              path='/customer/bills/:userId/create'
            />
            <Redirect to='/home' />
          </DashLayout>
        </Switch>
      </BrowserRouter>
    </div>
  );
};

export default App;
