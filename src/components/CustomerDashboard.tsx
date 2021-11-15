import React from 'react';
import NavBar from './NavBar';
import { Box } from '@chakra-ui/react';
import Dash_Layout from "../layout/dashboard";

const CustomerDashboard: React.FC = () => {
  return (
    <Dash_Layout title="Dashboard">
      <Box>Welcome to your Power management System. Customer Dashboard</Box>
    </Dash_Layout>
  );
};

export default CustomerDashboard;
