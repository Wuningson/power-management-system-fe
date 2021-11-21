import CustomerCard from './CustomerCard';
import { useSelector } from 'react-redux';
import { RootState } from '../utils/store';
import { useHistory } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import CustomerAPIService from '../api/CustomerAPIService';
import LoadingActionsCreator from '../actions/LoadingActionsCreator';
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
    history.push('/customer/create');
  };

  return (
    <>
      <Flex justifyContent='space-between' marginBottom='2em'>
        {type === 'employee' && (
          <Button onClick={handleNewCustomer}>Add New Customer</Button>
        )}
      </Flex>
      <Box>
        {loading ? (
          <Center height='40vh'>
            <Spinner color='#120c4b' emptyColor='gray.200' size='xl' />
          </Center>
        ) : customers.length ? (
          <Grid templateColumns='repeat(3, 1fr)' gap={6}>
            {customers.map((customer, idx) => (
              <Box onClick={handleClick(customer._id)}>
                <CustomerCard {...customer} cardType='employee' key={idx} />
              </Box>
            ))}
          </Grid>
        ) : (
          <Table>
            <Tr>
              <Td colspan={12} className='text-center padding_50'>
                <h4 className='text-danger font-sm-4 mb-2 font-weight-700'>
                  No Record Found
                </h4>
                <p className='lead font-gray'>
                  There are no bills at this moment. Check back again later
                </p>
              </Td>
            </Tr>
          </Table>
        )}
      </Box>
    </>
  );
};

export default Customer;
