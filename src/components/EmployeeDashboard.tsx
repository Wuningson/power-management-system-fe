import { Box } from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import { RootState } from '../utils/store';
import { Redirect } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import AuthAPIService from '../api/AuthAPIService';
import {
  Line,
  XAxis,
  YAxis,
  Legend,
  Tooltip,
  LineChart,
  CartesianGrid,
  ResponsiveContainer
} from 'recharts';

const EmployeeDashboard: React.FC = () => {
  const [bills, setBills] = useState<DashboardData[]>([]);
  const [payments, setPayments] = useState<DashboardData[]>([]);
  const { type } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    async function getData() {
      const { data } = await AuthAPIService.getEmployeeDashboardData();
      const billsKeys = Object.keys(data.bills);
      const billsValues = Object.values(data.bills);
      setBills(
        billsKeys.map((key, idx) => ({
          month: key,
          value: billsValues[idx]
        }))
      );

      const paymentsKeys = Object.keys(data.payments);
      const paymentsValues = Object.values(data.payments);
      setPayments(
        paymentsKeys.map((key, idx) => ({
          month: key,
          value: paymentsValues[idx]
        }))
      );
    }

    getData();
  }, []);

  return type === 'employee' ? (
    <>
      <Box>Employee Dashboard</Box>
      <h3>Bill History</h3>
      <ResponsiveContainer width='80%' height={300}>
        <LineChart
          width={500}
          height={200}
          syncId='anyId'
          data={bills}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0
          }}
        >
          <Legend />
          <CartesianGrid strokeDasharray='3 3' />
          <XAxis dataKey='month' />
          <YAxis />
          <Tooltip />
          <Line
            type='monotone'
            dataKey='value'
            stroke='#8884d8'
            fill='#8884d8'
          />
        </LineChart>
      </ResponsiveContainer>

      <br />

      <h3>Payment History</h3>
      <ResponsiveContainer width='80%' height={300}>
        <LineChart
          width={500}
          height={200}
          syncId='anyId'
          data={payments}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0
          }}
        >
          <Legend />
          <CartesianGrid strokeDasharray='3 3' />
          <XAxis dataKey='month' />
          <YAxis />
          <Tooltip />
          <Line
            type='monotone'
            dataKey='value'
            stroke='#8884d8'
            fill='#8884d8'
          />
        </LineChart>
      </ResponsiveContainer>
    </>
  ) : (
    <Redirect to='/customer' />
  );
};

export default EmployeeDashboard;
