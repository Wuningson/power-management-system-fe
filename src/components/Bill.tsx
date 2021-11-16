import NavBar from './NavBar';
import BillTable from './BillTable';
import { Text } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import BillAPIService from '../api/BillAPIService';
import { RouteComponentProps, useHistory } from 'react-router-dom';
import Dash_Layout from "../layout/dashboard";

type BillProps = RouteComponentProps<{ userId: string }>;

const Bill: React.FC<BillProps> = ({ match }) => {
  const [bills, setBills] = useState<Bill[]>([]);
  // useEffect(() => {
  //   const userId = match.params.userId;
  //   async function getData() {
  //     const data = await BillAPIService.fetchBills(userId);
  //     console.log({ data: data.data });
  //     setBills(data.data);
  //   }
  //   getData();
  // }, [match.params.userId]);

  const history = useHistory();
  const handleBack = () => {
    history.goBack();
  };

  return (
      <Dash_Layout title="Bills">

      <BillTable bills={bills} />
    </Dash_Layout>
  );
};

export default Bill;
