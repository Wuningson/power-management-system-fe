import Utils from '../utils/Utils';
import { useSelector } from 'react-redux';
import { RootState } from '../utils/store';
import { Redirect } from 'react-router-dom';
import AuthAPIService from '../api/AuthAPIService';
import React, { useEffect, useState } from 'react';
import BillAPIService from '../api/BillAPIService';
import LoadingActionsCreator from '../actions/LoadingActionsCreator';
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

const CustomerDashboard: React.FC = () => {
  const [bills, setBills] = useState<Bill[]>([]);
  const [totalPayment, setTotalPayment] = useState<number>(0);
  const [totalBill, setTotalBill] = useState<number>(0);
  const { _id, type } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    async function getData() {
      LoadingActionsCreator.setLoading(true);
      const data = await BillAPIService.fetchBills(_id);
      const {
        data: { totalBill, totalPayment }
      } = await AuthAPIService.getCustomerById(_id);
      setBills(data.data);
      setTotalBill(totalBill);
      setTotalPayment(totalPayment);
      LoadingActionsCreator.setLoading(false);
    }
    getData();
  }, [_id]);

  const data = bills.map(({ rate, createdAt, unitsUsed }) => {
    return {
      rate,
      total: rate * unitsUsed,
      month: Utils.getMonth(new Date(createdAt).getMonth())
    };
  });
  console.log(data);

  return type === 'customer' ? (
    <>
      <h2>Welcome to your Power management System</h2>
      <div>
        <span>Total Bills: {totalBill}</span>
        <span>Total Payments: {totalPayment}</span>
        {/* If it's possible to have green and red for the balance based on whether it's positive or negative */}
        <span>Balance: {totalPayment - totalBill}</span>
      </div>
      <h3>Bill History</h3>
      <ResponsiveContainer width='80%' height={300}>
        <LineChart
          width={500}
          height={200}
          syncId='anyId'
          data={data}
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
            dataKey='total'
            stroke='#8884d8'
            fill='#8884d8'
          />
        </LineChart>
      </ResponsiveContainer>
      <br />
      <h3>Rate</h3>
      <ResponsiveContainer width='80%' height={300}>
        <LineChart
          width={500}
          height={200}
          syncId='anyId'
          data={data}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0
          }}
        >
          <CartesianGrid strokeDasharray='3 3' />
          <XAxis dataKey='month' />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type='monotone'
            dataKey='rate'
            stroke='#8884d8'
            fill='#8884d8'
          />
        </LineChart>
      </ResponsiveContainer>
    </>
  ) : (
    <Redirect to='/employee' />
  );
};

export default CustomerDashboard;
