import CustomerCard from './CustomerCard';
import { useSelector } from 'react-redux';
import { RootState } from '../utils/store';
import { useHistory } from 'react-router-dom';
import { Box, Button, Flex } from '@chakra-ui/react';
import CustomerAPIService from '../api/CustomerAPIService';
import React, { Fragment, useEffect, useState } from 'react';
import Dash_Layout from "../layout/dashboard";

const Customer: React.FC = () => {
  const history = useHistory();
  const [customers, setCustomers] = useState<GetCustomerResponse[]>([]);

  useEffect(() => {
    async function getData() {
      const data = await CustomerAPIService.fetchCustomers();
      setCustomers(data.data);
    }
    getData();
  });

  const handleClick = (userId: string) => (e: any) => {
    history.push(`/employee/tab/${userId}`);
  };

  const handleBack = () => {
    history.goBack();
  };

  const handleNewCustomer = () => {
    history.push('/customer/create');
  };

  const { type } = useSelector((state: RootState) => state.auth);

  return (

      <Dash_Layout title="Customers">

      <Flex justifyContent='space-between' className="mb-4">
        {type === 'employee' && (
          <Button onClick={handleNewCustomer}>Add New Customer</Button>
        )}
      </Flex>


      {customers.map((customer, idx) => (
        <div className="mb-2 w-100" onClick={handleClick(customer._id)}>
          <CustomerCard {...customer} cardType='employee' key={idx} />
        </div>
      ))}


      </Dash_Layout>
  );
};

export default Customer;
