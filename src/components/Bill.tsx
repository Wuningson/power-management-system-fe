import BillTable from './BillTable';
import React, { useEffect, useState } from 'react';
import BillAPIService from '../api/BillAPIService';
import { RouteComponentProps } from 'react-router-dom';
import LoadingActionsCreator from '../actions/LoadingActionsCreator';
import { useSelector } from 'react-redux';
import { RootState } from '../utils/store';
import { Spinner, Center } from '@chakra-ui/react';

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

  return (
    <>
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
