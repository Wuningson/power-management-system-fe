import { useTable } from 'react-table';
import { useForm } from 'react-hook-form';
import React, { useState, useMemo } from 'react';
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Input,
  Box,
  Button
} from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import { RootState } from '../utils/store';
import { useHistory } from 'react-router-dom';

interface PaymentTableProps {
  payments: Payment[];
}

const PaymentTable: React.FC<PaymentTableProps> = ({ payments }) => {
  const [search, setSearch] = useState('');
  const { register } = useForm<{ search: string }>();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const filtered = payments.filter((bill) => {
    const input = search.toLowerCase();
    if (
      bill.reference.includes(input) ||
      bill.amount.toString().includes(input) ||
      bill.customerId.firstName.toLowerCase().includes(input) ||
      bill.customerId.lastName.toLowerCase().includes(input) ||
      bill.customerId.accountNo.toLowerCase().includes(input)
    ) {
      return true;
    }
    return false;
  });

  const data = useMemo(
    () =>
      filtered.map(
        ({
          _id,
          customerId: { firstName, lastName, accountNo },
          amount,
          reference,
          createdAt
        }) => {
          return {
            _id,
            amount,
            name: `${firstName} ${lastName}`,
            accountNo,
            reference,
            createdAt: new Date(createdAt).toDateString()
          };
        }
      ),
    [filtered]
  );

  const columns = useMemo(
    () => [
      {
        Header: 'Customer',
        accessor: 'name'
      },
      {
        Header: 'Account No',
        accessor: 'accountNo'
      },
      {
        Header: 'Payment Reference',
        accessor: 'reference'
      },
      {
        Header: 'Amount',
        accessor: 'amount'
      },
      {
        Header: 'Date',
        accessor: 'createdAt'
      }
    ],
    []
  );

  const history = useHistory();
  const makePayment = (e: any) => {
    history.push('/payments/customer');
  };

  const { type } = useSelector((state: RootState) => state.auth);

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    // @ts-ignore
    useTable({ columns, data });

  return (
    <div>
      <div className='bg-purple_transparent p-2 border_radius mb-3'>
        {type === 'customer' && (
          <Button
            className='float-end bg-primary font-white'
            onClick={makePayment}
          >
            Make Payment
          </Button>
        )}
        <Box width='30em'>
          <Input
            id='search'
            value={search}
            {...register('search')}
            onChange={handleChange}
            placeholder='Search'
            className='bg-white'
          />
        </Box>
      </div>
      <Table {...getTableProps()}>
        <Thead>
          {headerGroups.map((headerGroup) => (
            <Tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <Th>{column.render('Header')}</Th>
              ))}
            </Tr>
          ))}
        </Thead>
        <Tbody {...getTableBodyProps()}>
          {rows.length >= 1 ? (
            rows.map((row) => {
              prepareRow(row);
              return (
                <Tr {...row.getRowProps()}>
                  {row.cells.map((cell) => (
                    <Td {...cell.getCellProps()}>{cell.render('Cell')}</Td>
                  ))}
                </Tr>
              );
            })
          ) : (
            <Tr>
              <Td colspan={12} className='text-center padding_50'>
                <h4 className='text-danger font-sm-4 mb-2 font-weight-700'>
                  No Record Found
                </h4>
                <p className='lead font-gray'>
                  There are no payment records at this moment. Check back again
                  later
                </p>
              </Td>
            </Tr>
          )}
        </Tbody>
      </Table>
    </div>
  );
};

export default PaymentTable;
