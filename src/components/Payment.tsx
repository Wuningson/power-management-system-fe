import PaymentTable from './PaymentTable';
import React, { useEffect, useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import PaymentAPIService from '../api/PaymentAPIService';
import { Center, Spinner } from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import { RootState } from '../utils/store';
import LoadingActionsCreator from '../actions/LoadingActionsCreator';

type PaymentProps = RouteComponentProps<{ userId: string }>;

const Payment: React.FC<PaymentProps> = ({ match }) => {
  const loading = useSelector((state: RootState) => state.loading);
  const [payments, setPayments] = useState<Payment[]>([]);
  useEffect(() => {
    const userId = match.params.userId;
    async function getData() {
      LoadingActionsCreator.setLoading(true);
      const data = await PaymentAPIService.fetchPayments(userId);
      setPayments(data.data);
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
        <PaymentTable payments={payments} />
      )}
    </>
  );
};

export default Payment;
