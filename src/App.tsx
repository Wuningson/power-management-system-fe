import React from 'react';
import Bill from './components/Bill';
import Login from './components/Login';
import ReduxStore from './utils/store';
import { Toaster } from 'react-hot-toast';
import Payment from './components/Payment';
import Customer from './components/Customer';
import HomePage from './components/HomePage';
import EmployeeTab from './components/EmployeeTab';
import PaymentForm from './components/PaymentForm';
import CreateCustomer from './components/CreateCustomer';
import CustomerDashboard from './components/CustomerDashboard';
import EmployeeDashboard from './components/EmployeeDashboard';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import './cdn/b5/css/bootstrap.css';
import './cdn/css/look_css/css/look_base_v2.css';
import './cdn/css/style.css';
import DashLayout from './layout/DashLayout';

const App: React.FC = () => {
  console.log('app');
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
        <Switch>
          <Route exact path='/signin' component={Login} />
          <DashLayout>
            <Route path='/home' component={HomePage} />
            <Route exact path='/customer' component={CustomerDashboard} />
            <Route exact path='/employee' component={EmployeeDashboard} />
            <Route exact path='/employee/customers' component={Customer} />
            <Route exact path='/customer/bills/:userId' component={Bill} />
            <Route
              exact
              path='/customer/payments/:userId'
              component={Payment}
            />
            <Route component={EmployeeTab} path='/employee/tab/:userId' />
            <Route component={CreateCustomer} path='/customer/create' />
            <Route component={PaymentForm} path='/payments/customer' />
            <Redirect to='/home' />
          </DashLayout>
        </Switch>
      </BrowserRouter>
      <Toaster
        position='top-center'
        reverseOrder={false}
        toastOptions={{
          duration: 5000
        }}
      />
    </div>
  );
};

export default App;
