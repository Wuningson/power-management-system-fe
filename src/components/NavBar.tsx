import Utils from '../utils/Utils';
import React, { Fragment } from 'react';
import { GrLogout } from 'react-icons/gr';
import { useSelector } from 'react-redux';
import ReduxStore, { RootState } from '../utils/store';
import { Link as RLink } from 'react-router-dom';
import { Box, Button, Text, Flex } from '@chakra-ui/react';
import { Link } from '@chakra-ui/react';

const NavBar: React.FC = () => {
  const { firstName, lastName, type, _id } = useSelector(
    (state: RootState) => state.auth
  );

  const fullName = Utils.capitalize(`${firstName} ${lastName}`);

  const logout = () => {
    ReduxStore.dispatch({
      type: 'UNAUTHENTICATED'
    });
  };

  return (
    <Flex
      spacing={4}
      w='100vw'
      border='1px solid black'
      justifyContent='space-around'
      alignItems='center'
    >
      <Link as={RLink} to='/'>
        Power Management System
      </Link>
      {type === 'employee' ? (
        <Fragment>
          <Link as={RLink} to='/employee/customers'>
            Customers
          </Link>
        </Fragment>
      ) : type === 'customer' ? (
        <Fragment>
          <Link as={RLink} to={`/customer/bills/${_id}`}>
            Bills
          </Link>
          <Link as={RLink} to={`/customer/payments/${_id}`}>
            Payments
          </Link>
        </Fragment>
      ) : null}
      <Flex alignItems='center'>
        <Text mr={3}>{fullName}</Text>
        <Button onClick={logout} rightIcon={<GrLogout />}>
          Log out
        </Button>
      </Flex>
    </Flex>
  );
};

export default NavBar;
