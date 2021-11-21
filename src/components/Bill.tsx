import BillTable from './BillTable';
import React, { useEffect, useState } from 'react';
import BillAPIService from '../api/BillAPIService';
import { RouteComponentProps } from 'react-router-dom';

type BillProps = RouteComponentProps<{ userId: string }>;

const Bill: React.FC<BillProps> = ({ match }) => {
  const [bills, setBills] = useState<Bill[]>([]);
  useEffect(() => {
    const userId = match.params.userId;
    async function getData() {
      const data = await BillAPIService.fetchBills(userId);
      console.log({ data: data.data });
      setBills(data.data);
    }
    getData();
  }, [match.params.userId]);

  return (
    <>
      <BillTable bills={bills} />
    </>
  );
};

export default Bill;
