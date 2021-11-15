import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import CustomerAPIService from '../api/CustomerAPIService';
import {
  Box,
  Input,
  Button,
  VStack,
  InputGroup,
  InputRightElement
} from '@chakra-ui/react';

const CreateCustomer: React.FC = () => {
  const { register } = useForm<AddCustomerPayload>();
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState<AddCustomerPayload>({
    email: '',
    meterNo: 0,
    address: '',
    password: '',
    lastName: '',
    firstName: '',
    accountNo: '',
    middleName: ''
  });

  const {
    email,
    meterNo,
    address,
    password,
    lastName,
    firstName,
    accountNo,
    middleName
  } = form;

  const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = await CustomerAPIService.addNewCustomer(form);
    console.log(res);
  };

  const handleClick = () => setShowPassword(!showPassword);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const history = useHistory();
  const goBack = () => {
    history.goBack();
  };

  return (
    <>
      <Button onClick={goBack}>Go Back</Button>
      <VStack spacing='48px'>
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
          <Box marginBottom='2em'>
            <label htmlFor='password'>Password</label>
            <InputGroup size='md'>
              <Input
                pr='4.5rem'
                {...register('password')}
                required={true}
                placeholder='Password@123'
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={handleChange}
              />
              <InputRightElement width='4.5rem'>
                <Button h='1.75rem' size='sm' onClick={handleClick}>
                  {showPassword ? 'Hide' : 'Show'}
                </Button>
              </InputRightElement>
            </InputGroup>
          </Box>
          <Button colorScheme='blue' type='submit'>
            Create New Customer
          </Button>
        </form>
      </VStack>
    </>
  );
};

export default CreateCustomer;
