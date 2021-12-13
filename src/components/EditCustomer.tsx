import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import AuthAPIService from '../api/AuthAPIService';
import { RootState } from '../utils/store';
import { VStack, Input, Box, Button } from '@chakra-ui/react';
import AuthActionsCreator from '../actions/AuthActionsCreator';

interface EditCustomerProps {
  email: string;
  lastName: string;
  firstName: string;
  middleName: string | undefined;
}

export interface EditCustomerState extends EditCustomerProps {
  password: string;
}

const EditCustomer: React.FC<EditCustomerProps> = (props) => {
  const { _id } = useSelector((state: RootState) => state.auth);
  const {
    email: mail,
    lastName: last,
    firstName: first,
    middleName: middle
  } = props;

  const [form, setForm] = useState<EditCustomerState>({
    email: mail,
    lastName: last,
    firstName: first,
    middleName: middle,
    password: ''
  });
  const { firstName, lastName, email, middleName, password } = form;

  const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { data } = await AuthAPIService.updateCustomerById(_id, form);
    AuthActionsCreator.authenticate(data);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const { register } = useForm<EditCustomerState>();

  return (
    <VStack>
      <form onSubmit={handleSubmit}>
        <Box marginBottom='2em'>
          <label htmlFor='email'>Email:</label>
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
          <label htmlFor='firstName'>First Name:</label>
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
          <label htmlFor='middleName'>Middle Name:</label>
          <Input
            id='middleName'
            value={middleName}
            required={true}
            {...register('middleName')}
            onChange={handleChange}
            placeholder='Jean'
          />
        </Box>
        <Box marginBottom='2em'>
          <label htmlFor='lastName'>Last Name:</label>
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
          <label htmlFor='password'>Password:</label>
          <Input
            id='password'
            value={password}
            required={true}
            {...register('password')}
            onChange={handleChange}
            placeholder='100.5'
          />
        </Box>
        <Button colorScheme='blue' type='submit'>
          Update Customer
        </Button>
      </form>
    </VStack>
  );
};

export default EditCustomer;
