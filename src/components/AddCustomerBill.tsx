import Utils from '../utils/Utils';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import BillAPIService from '../api/BillAPIService';
import { VStack, Input, Box, Select, Button } from '@chakra-ui/react';

const AddCustomerBill: React.FC<{ userId: string }> = ({ userId }) => {
  const [bill, setBill] = useState<CustomerBillPayload>({
    rate: 0,
    userId: userId,
    unitsUsed: 0,
    billingMonth: 0
  });

  const { rate, unitsUsed, billingMonth } = bill;

  const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = await BillAPIService.addCustomerBill(bill);
    console.log(res);
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
        <Button colorScheme='blue' type='submit'>
          Create New Customer
        </Button>
      </form>
    </VStack>
  );
};

export default AddCustomerBill;
