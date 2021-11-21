import Utils from '../utils/Utils';
import React, { useState } from 'react';
import { Redirect } from 'react-router';
import { useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { RootState } from '../utils/store';
import PaymentAPIService from '../api/PaymentAPIService';
import DashLayout from '../layout/DashLayout';
import { VStack, Box, Input, Button, Center, Spinner } from '@chakra-ui/react';

const PaymentForm: React.FC = () => {
  const state = useSelector((state: RootState) => state);
  const user = state.auth;
  const loading = state.loading;
  const [form, setForm] = useState<PaymentPayload>({
    email: user.email,
    amount: 0,
    channel: 'card'
  });
  const { register } = useForm<PaymentPayload>();
  const { email, amount } = form;
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    async function getUrl() {
      const { data } = await PaymentAPIService.generatePaymentUrl(form);
      window.location.assign(data);
    }
    getUrl();
  };

  if (Utils.isCustomer(user)) {
    return (
      <DashLayout>
        <VStack spacing='24px'>
          <form onSubmit={handleSubmit}>
            <Box marginBottom='2em'>
              <label htmlFor='email'>Email</label>
              <Input
                id='userId'
                value={email}
                {...register('email')}
                onChange={handleChange}
                placeholder='example@email.com'
                required={true}
              />
            </Box>
            <Box marginBottom='2em'>
              <label htmlFor='amount'>Amount</label>
              <Input
                id='userId'
                value={amount}
                {...register('amount')}
                onChange={handleChange}
                placeholder='10000'
                required={true}
              />
            </Box>
            <Button colorScheme='blue' type='submit' disabled={loading}>
              {loading ? (
                <Center height='40vh'>
                  <Spinner color='#120c4b' emptyColor='gray.200' size='md' />
                </Center>
              ) : (
                'Make Payment'
              )}
            </Button>
          </form>
        </VStack>
      </DashLayout>
    );
  } else return <Redirect to='/employee/customers' />;
};

export default PaymentForm;
