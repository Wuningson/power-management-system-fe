import PaymentTable from './PaymentTable';
import React, { useEffect, useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import PaymentAPIService from '../api/PaymentAPIService';

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

  return (
    <>
      <PaymentTable payments={payments} />
    </>
  );
};

export default Payment;
