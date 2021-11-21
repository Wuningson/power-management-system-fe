import Bill from './Bill';
import Payment from './Payment';
import React, { useState } from 'react';
import { Flex, Button } from '@chakra-ui/react';
import { RouteComponentProps } from 'react-router-dom';

type EmployeeTabType = 'payment' | 'bill';
type EmployeeTabProps = RouteComponentProps<{ userId: string }>;

const EmployeeTab: React.FC<EmployeeTabProps> = (props) => {
  const [tab, setTab] = useState<EmployeeTabType>('bill');
  const handleClick = (tab: EmployeeTabType) => (e: any) => {
    setTab(tab);
  };
  return (
    <>
      <Flex
        justifyContent='space-between'
        marginRight='10em'
        marginLeft='10em'
        marginBottom='1em'
      >
        <Button disabled={tab === 'bill'} onClick={handleClick('bill')}>
          Bills
        </Button>
        <Button disabled={tab === 'payment'} onClick={handleClick('payment')}>
          Payments
        </Button>
      </Flex>
      {tab === 'bill' ? <Bill {...props} /> : <Payment {...props} />}
    </>
  );
};

export default EmployeeTab;
