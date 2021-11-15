import Bill from './Bill';
import Payment from './Payment';
import React, { useState } from 'react';
import { Flex, Box, Text } from '@chakra-ui/react';
import { RouteComponentProps, useHistory } from 'react-router-dom';

type EmployeeTabType = 'payment' | 'bill';
type EmployeeTabProps = RouteComponentProps<{ userId: string }>;

const EmployeeTab: React.FC<EmployeeTabProps> = (props) => {
  const [tab, setTab] = useState<EmployeeTabType>('bill');
  const handleChange = (tab: EmployeeTabType) => (e: any) => {
    setTab(tab);
  };

  const history = useHistory();
  const handleBack = () => {
    history.goBack();
  };

  return (
    <Box>
      {/* <Text fill='grey' onClick={handleBack}>
        Back
      </Text> */}
      {/* <Flex justifyContent='space-between'>
        <Box onClick={handleChange('bill')}>Bills</Box>
        <Box onClick={handleChange('payment')}>Payments</Box>
      </Flex> */}
      {tab === 'bill' ? <Bill {...props} /> : <Payment {...props} />}
    </Box>
  );
};

export default EmployeeTab;
