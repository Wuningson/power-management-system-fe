import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import AuthAPIService from '../api/AuthAPIService';
import toast from "react-hot-toast";
import {
  Box,
  Input,
  Button,
  VStack,
  InputGroup,
  InputRightElement
} from '@chakra-ui/react';

const Login: React.FC = () => {
  const { register } = useForm<LoginFormValues>();
  const [showPassword, setShowPassword] = useState(false);
  const [userId, setUserId] = useState('42/3249/98');
  const [password, setPassword] = useState('Password@123');
  const history = useHistory();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const { name, value } = e.target;
    if (name === 'userId') {
      setUserId(value);
    } else if (name === 'password') {
      setPassword(value);
    }
  };

  const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    toast.loading('Authenticating user')
    const { type } = await AuthAPIService.login({ userId, password });
    if (type === 'customer') {
      history.push('/customer');
      toast.dismiss();
    } else {
      history.push('/employee');
      toast.dismiss();
    }
  };

  const handleClick = () => setShowPassword(!showPassword);

  return (
      <section className="bg-purple_transparent h-100">

        <div className="col-4 mx-auto padding_100-top">

          <h1 className="font-lg mb-3 text-center text-primary font-weight-700">Bill Management System</h1>
          <div className="bg-white p-5 shadow border_radius">


          <form onSubmit={handleSubmit}>
            <Box marginBottom='2em'>
              <label htmlFor='userId'>Account No/Employee Id</label>
              <Input
                  id='userId'
                  value={userId}
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
                    {...register('password')}
                    placeholder='Enter password'
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
            <Button className="bg-primary font-white w-100" type='submit'>
              Login
            </Button>
          </form>

          </div>

        </div>

    <VStack spacing='24px'>

    </VStack>
      </section>
  );
};

export default Login;
