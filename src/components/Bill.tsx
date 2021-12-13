import BillTable from './BillTable';
import React, { useEffect, useState } from 'react';
import BillAPIService from '../api/BillAPIService';
import { RouteComponentProps, useHistory } from 'react-router-dom';
import LoadingActionsCreator from '../actions/LoadingActionsCreator';
import { useSelector } from 'react-redux';
import { RootState } from '../utils/store';
import { Spinner, Center, Flex, Button } from '@chakra-ui/react';

type BillProps = RouteComponentProps<{ userId: string }>;

const Bill: React.FC<BillProps> = ({ match }) => {
  const loading = useSelector((state: RootState) => state.loading);
  const [bills, setBills] = useState<Bill[]>([]);
  useEffect(() => {
    const userId = match.params.userId;
    async function getData() {
      LoadingActionsCreator.setLoading(true);
      const data = await BillAPIService.fetchBills(userId);
      console.log({ data: data.data });
      setBills(data.data);
      LoadingActionsCreator.setLoading(false);
    }
    getData();
  }, [match.params.userId]);

  const history = useHistory();
  const state = useSelector((state: RootState) => state);
  const { type } = state.auth;

  const handleNewBill = () => {
    history.push(`/employee/bills/${match.params.userId}/create`);
  };

  return (
    <>
      <Flex justifyContent='space-between' marginBottom='2em'>
        {type === 'employee' && (
          <Button onClick={handleNewBill}>Add Customer Bill</Button>
        )}
      </Flex>
      {loading ? (
        <Center height='40vh'>
          <Spinner color='#120c4b' emptyColor='gray.200' size='xl' />
        </Center>
      ) : (
        <BillTable bills={bills} />
      )}
    </>
  );
};

export default Bill;
