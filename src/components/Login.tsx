import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { RootState } from '../utils/store';
import { useHistory } from 'react-router-dom';
import AuthAPIService from '../api/AuthAPIService';
import AlertsActionsCreator from '../actions/AlertActionsCreator';
import LoadingActionsCreator from '../actions/LoadingActionsCreator';
import {
  Box,
  Input,
  Alert,
  Button,
  VStack,
  Center,
  Spinner,
  AlertIcon,
  InputGroup,
  InputRightElement
} from '@chakra-ui/react';

const Login: React.FC = () => {
  const history = useHistory();
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const { register } = useForm<LoginFormValues>();
  const [showPassword, setShowPassword] = useState(false);
  const { loading, alert } = useSelector((state: RootState) => state);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const { name, value } = e.target;
    if (name === 'userId') {
      setUserId(value);
    } else if (name === 'password') {
      setPassword(value);
    }
  };

  const dismissAlert = (id: string) => (e: any) => {
    AlertsActionsCreator.removeAlert(id);
  };

  const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    LoadingActionsCreator.setLoading(true);
    const { type } = await AuthAPIService.login({ userId, password });
    LoadingActionsCreator.setLoading(false);
    if (type === 'customer') {
      history.push('/customer');
    } else {
      history.push('/employee');
    }
  };

  const handleClick = () => setShowPassword(!showPassword);

  return (
    <section className='bg-purple_transparent h-100'>
      <div className='col-4 mx-auto padding_100-top'>
        {alert.map(({ id, type, message }) => (
          <Alert key={id} status={type} onClick={dismissAlert(id!)}>
            <AlertIcon />
            {message}
          </Alert>
        ))}
        <h1 className='font-lg mb-3 text-center text-primary font-weight-700'>
          Bill Management System
        </h1>
        <div className='bg-white p-5 shadow border_radius'>
          <form onSubmit={handleSubmit}>
            <Box marginBottom='2em'>
              <label htmlFor='userId'>Account No/Employee Id</label>
              <Input
                id='userId'
                value={userId}
                required={true}
                {...register('userId')}
                onChange={handleChange}
                placeholder='Account No/ Employee Id'
              />
            </Box>
            <Box marginBottom='2em'>
              <label htmlFor='password'>Password</label>
              <InputGroup size='md'>
                <Input
                  pr='4.5rem'
                  required={true}
                  value={password}
                  {...register('password')}
                  onChange={handleChange}
                  placeholder='Enter password'
                  type={showPassword ? 'text' : 'password'}
                />
                <InputRightElement width='4.5rem'>
                  <Button h='1.75rem' size='sm' onClick={handleClick}>
                    {showPassword ? 'Hide' : 'Show'}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </Box>
            <Button
              className='bg-primary font-white w-100'
              type='submit'
              disabled={loading}
            >
              {loading ? (
                <Center height='40vh'>
                  <Spinner color='#120c4b' emptyColor='gray.200' size='md' />
                </Center>
              ) : (
                'Login'
              )}
            </Button>
          </form>
        </div>
      </div>

      <VStack spacing='24px'></VStack>
    </section>
  );
};

export default Login;
