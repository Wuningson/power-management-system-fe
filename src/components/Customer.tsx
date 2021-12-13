import CustomerCard from './CustomerCard';
import { useSelector } from 'react-redux';
import { RootState } from '../utils/store';
import { useHistory } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import CustomerAPIService from '../api/CustomerAPIService';
import LoadingActionsCreator from '../actions/LoadingActionsCreator';
import Dash_Layout from "../layout/dashboard";
import {
  Tr,
  Td,
  Box,
  Flex,
  Grid,
  Table,
  Button,
  Center,
  Spinner
} from '@chakra-ui/react';

const Customer: React.FC = () => {
  const state = useSelector((state: RootState) => state);
  const { type } = state.auth;
  const loading = state.loading;

  const history = useHistory();
  const [customers, setCustomers] = useState<GetCustomerResponse[]>([]);

  useEffect(() => {
    async function getData() {
      LoadingActionsCreator.setLoading(true);
      const data = await CustomerAPIService.fetchCustomers();
      setCustomers(data.data);
      LoadingActionsCreator.setLoading(false);
    }
    getData();
  }, []);

  const handleClick = (userId: string) => (e: any) => {
    history.push(`/employee/tab/${userId}`);
  };

  const handleNewCustomer = () => {
    history.push('/employee/customers/create');
  };

  return (
      <Dash_Layout title="Customers">

        <Flex justifyContent='space-between' className="mb-4">
          {type === 'employee' && (
              <Button onClick={handleNewCustomer}>Add New Customer</Button>
          )}
        </Flex>

        {loading ? (
            <Center height='40vh'>
              <Spinner color='#120c4b' emptyColor='gray.200' size='xl' />
            </Center>
        ) : customers.length ? (
        customers.map((customer, idx) => (
            <div className="mb-2 w-100" onClick={handleClick(customer._id)}>
              <CustomerCard {...customer} cardType='employee' key={idx} />
            </div>
        ))
        ) : (
            <Table>
              <Tr>
                <Td colspan={12} className='text-center padding_50'>
                  <h4 className='text-danger font-sm-4 mb-2 font-weight-700'>
                    No Record Found
                  </h4>
                  <p className='lead font-gray'>
                    There are no Customers at this moment. Check back again later
                  </p>
                </Td>
              </Tr>
            </Table>
        )}


      </Dash_Layout>

  );
};

export default Customer;
