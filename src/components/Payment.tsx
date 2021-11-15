import PaymentTable from './PaymentTable';
import { useSelector } from 'react-redux';
import { RootState } from '../utils/store';
import { Text, Button } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import PaymentAPIService from '../api/PaymentAPIService';
import { RouteComponentProps, useHistory } from 'react-router-dom';

type PaymentProps = RouteComponentProps<{ userId: string }>;

const Payment: React.FC<PaymentProps> = ({ match }) => {
  const [payments, setPayments] = useState<Payment[]>([]);
  useEffect(() => {
    const userId = match.params.userId;
    async function getData() {
      const data = await PaymentAPIService.fetchPayments(userId);
      setPayments(data.data);
    }
    getData();
  }, [match.params.userId]);

  const history = useHistory();
  const handleBack = () => {
    history.goBack();
  };

  const { type } = useSelector((state: RootState) => state.auth);

  return (
    <div>
      <Text fill='grey' onClick={handleBack}>
        Back
      </Text>
      {type === 'customer' && <Button>Make Payment</Button>}
      <PaymentTable payments={payments} />
    </div>
  );
};

export default Payment;
