import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { RootState } from '../utils/store';
import { useHistory } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import CustomerAPIService from '../api/CustomerAPIService';
import LoadingActionsCreator from '../actions/LoadingActionsCreator';
import { Box, Input, Button, VStack, Spinner } from '@chakra-ui/react';

const CreateCustomer: React.FC = () => {
  const loading = useSelector((state: RootState) => state.loading);
  const { register } = useForm<AddCustomerPayload>();
  const [form, setForm] = useState<AddCustomerPayload>({
    email: '',
    meterNo: 0,
    address: '',
    lastName: '',
    firstName: '',
    accountNo: '',
    middleName: ''
  });

  const {
    email,
    meterNo,
    address,
    lastName,
    firstName,
    accountNo,
    middleName
  } = form;

  const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    LoadingActionsCreator.setLoading(true);
    await CustomerAPIService.addNewCustomer(form);
    LoadingActionsCreator.setLoading(true);
    history.push('/employee');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const history = useHistory();

  useEffect(() => {
    LoadingActionsCreator.setLoading(false);
  }, []);

  return (
    <VStack spacing='108px'>
      <form onSubmit={handleSubmit}>
        <Box marginBottom='2em'>
          <label htmlFor='email'>Email</label>
          <Input
            id='email'
            value={email}
            type='email'
            required={true}
            {...register('email')}
            onChange={handleChange}
            placeholder='example@email.com'
          />
        </Box>
        <Box marginBottom='2em'>
          <label htmlFor='firstName'>First Name</label>
          <Input
            id='firstName'
            value={firstName}
            required={true}
            {...register('firstName')}
            onChange={handleChange}
            placeholder='John'
          />
        </Box>
        <Box marginBottom='2em'>
          <label htmlFor='lastName'>Last Name</label>
          <Input
            id='lastName'
            value={lastName}
            required={true}
            {...register('lastName')}
            onChange={handleChange}
            placeholder='Doe'
          />
        </Box>
        <Box marginBottom='2em'>
          <label htmlFor='middleName'>Middle Name</label>
          <Input
            id='middleName'
            value={middleName}
            {...register('middleName')}
            onChange={handleChange}
            placeholder='Jean'
          />
        </Box>
        <Box marginBottom='2em'>
          <label htmlFor='accountNo'>Account No</label>
          <Input
            required={true}
            id='accountNo'
            value={accountNo}
            {...register('accountNo')}
            onChange={handleChange}
            placeholder='johndoe'
          />
        </Box>
        <Box marginBottom='2em'>
          <label htmlFor='meterNo'>Meter Number</label>
          <Input
            id='meterNo'
            required={true}
            value={meterNo}
            {...register('meterNo')}
            onChange={handleChange}
            placeholder='1932731'
          />
        </Box>
        <Box marginBottom='2em'>
          <label htmlFor='address'>Address</label>
          <Input
            id='address'
            required={true}
            value={address}
            {...register('address')}
            onChange={handleChange}
            placeholder='Ojoo, Ibadan'
          />
        </Box>
        <Button color='#120c4b' type='submit' disabled={loading}>
          {loading ? (
            <Spinner color='#120c4b' emptyColor='gray.200' />
          ) : (
            'Create New Customer'
          )}
        </Button>
      </form>
    </VStack>
  );
};

export default CreateCustomer;
