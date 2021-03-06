import Utils from '../utils/Utils';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import BillAPIService from '../api/BillAPIService';
import LoadingActionsCreator from '../actions/LoadingActionsCreator';
import { VStack, Input, Box, Select, Button, Spinner } from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { RootState } from '../utils/store';

type AddCustomerBillProps = RouteComponentProps<{ userId: string }>;

const AddCustomerBill: React.FC<AddCustomerBillProps> = ({ match }) => {
  const loading = useSelector((state: RootState) => state.loading);
  const { userId } = match.params;
  const [bill, setBill] = useState<CustomerBillPayload>({
    rate: 0,
    unitsUsed: 0,
    billingMonth: 0,
    customerId: userId
  });

  const { rate, unitsUsed, billingMonth } = bill;
  const history = useHistory();

  const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    LoadingActionsCreator.setLoading(true);
    console.log(bill);
    await BillAPIService.addCustomerBill(bill);
    LoadingActionsCreator.setLoading(false);
    history.push(`/employee/tab/${userId}`);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setBill({ ...bill, [name]: value });
  };

  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setBill({ ...bill, billingMonth: Number(e.target.value) });
    console.log(billingMonth);
  };

  const { register } = useForm<CustomerBillPayload>();

  return (
    <VStack>
      <form onSubmit={handleSubmit}>
        <Box marginBottom='2em'>
          <label htmlFor='rate'>Rate:</label>
          <Input
            id='rate'
            value={rate}
            type='rate'
            required={true}
            {...register('rate')}
            onChange={handleChange}
            placeholder='10'
          />
        </Box>
        <Box marginBottom='2em'>
          <label htmlFor='unitsUsed'>Units Used:</label>
          <Input
            id='unitsUsed'
            value={unitsUsed}
            type='unitsUsed'
            required={true}
            {...register('unitsUsed')}
            onChange={handleChange}
            placeholder='100.5'
          />
        </Box>
        <Box marginBottom='2em'>
          <label htmlFor='rate'>Billing Month:</label>
          <Select
            placeholder='Select Month'
            onChange={handleSelect}
            defaultValue={billingMonth}
          >
            {Utils.months.map((month, idx) => (
              <option value={idx} key={idx}>
                {month}
              </option>
            ))}
          </Select>
        </Box>
        <Button type='submit' disabled={loading}>
          {loading ? (
            <Spinner color='#120c4b' emptyColor='gray.200' />
          ) : (
            'Add Bill'
          )}
        </Button>
      </form>
    </VStack>
  );
};

export default AddCustomerBill;
