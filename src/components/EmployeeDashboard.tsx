import React from 'react';
import NavBar from './NavBar';
import { Box } from '@chakra-ui/react';
import Dash_Layout from "../layout/dashboard";

const EmployeeDashboard: React.FC = () => {
  return (
      <Dash_Layout title="Employee">
      <Box>Employee Dashboard</Box>
    </Dash_Layout>
  );
};

export default EmployeeDashboard;
