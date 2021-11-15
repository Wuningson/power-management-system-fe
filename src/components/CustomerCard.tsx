import React from 'react';
import Utils from '../utils/Utils';
import { FaUser } from 'react-icons/fa';
import { GoLocation } from 'react-icons/go';
import { Box, Icon, Text } from '@chakra-ui/react';
import { MdAccountBalanceWallet } from 'react-icons/md';

export interface CustomerCardProps extends GetCustomerResponse {
  cardType: 'employee' | 'customer';
}

const CustomerCard: React.FC<CustomerCardProps> = (props) => {
  const {
    address,
    meterNo,
    lastName,
    cardType,
    createdBy,
    firstName,
    accountNo,
    totalBill,
    middleName,
    totalPayment
  } = props;
  const fullName = Utils.capitalize(
    middleName
      ? `${firstName} ${middleName} ${lastName}`
      : `${firstName} ${lastName}`
  );
  return (
    <Box maxW='sm' borderWidth='1px' borderRadius='lg' overflow='hidden' p='6'>
      <Box display='flex' alignItems='baseline'>
        <Icon as={FaUser} />
        <Text borderRadius='full' px='2'>
          {fullName}
        </Text>
        <Box>
          <Icon as={GoLocation} /> {address}
        </Box>
      </Box>
      <Box display='flex' alignItems='baseline'>
        <Box>Account Number: {accountNo}</Box>
        <Box>Meter Number: {meterNo}</Box>
      </Box>
      <Box display='flex' alignItems='baseline'>
        <Icon as={MdAccountBalanceWallet} />
        <Box>Total Bill: {totalBill}</Box>
        <Box>Total Paid: {totalPayment}</Box>
        <Box borderRadius='full' color='teal'>
          Balance: ₦{totalPayment - totalBill}
        </Box>
      </Box>
      {cardType === 'employee' && (
        <Box display='flex'>
          <Box>
            Created By: {`${createdBy.firstName} ${createdBy.lastName}`}
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default CustomerCard;
