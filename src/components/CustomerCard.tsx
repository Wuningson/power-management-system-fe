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
    <div className="p-3 shadow-hover border rounded-3 mb-3 cursor-pointer">
      <div className="border-bottom mb-2 pb-2">
        <div className="float-end">
          {cardType === 'employee' && (
              <Box display='flex'>
                <Box>
                  Created By: {`${createdBy.firstName} ${createdBy.lastName}`}
                </Box>
              </Box>
          )}
        </div>
        <h1 className="font-sm-3 fw-bold">{fullName}</h1>
        <Box className="font-xs">
          <Icon as={GoLocation} /> {address}
        </Box>
      </div>

      <div className="row">
        <div className="col-lg-3 border-end text-center">
          <p className="lead">{accountNo}</p>
          <p className="mb-0 text-uppercase font-xs font-gray">Account Number</p>
        </div>

        <div className="col-lg-3 border-end text-center">
          <p className="lead">{meterNo}</p>
          <p className="mb-0 text-uppercase font-xs font-gray">Meter Number</p>
        </div>
        <div className="col-lg-2 border-end text-center">
          <p className="lead">₦{totalBill}</p>
          <p className="mb-0 text-uppercase font-xs font-gray">Total Bill</p>
        </div>

        <div className="col-lg-2 border-end text-center">
          <p className="lead text-success">₦{totalPayment}</p>
          <p className="mb-0 text-uppercase font-xs font-gray">Total Payment</p>
        </div>

        <div className="col-lg-2 text-center">
          <p className="lead text-danger">₦{totalPayment - totalBill}</p>
          <p className="mb-0 text-uppercase font-xs font-gray">Balance</p>
        </div>

      </div>

    </div>
  );
};

export default CustomerCard;
