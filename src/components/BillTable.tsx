import Utils from '../utils/Utils';
import { useTable } from 'react-table';
import { useForm } from 'react-hook-form';
import React, { useState, useMemo } from 'react';
import { Table, Thead, Tbody, Tr, Th, Td, Input, Box } from '@chakra-ui/react';

interface BillTableProps {
  bills: Bill[];
}

const BillTable: React.FC<BillTableProps> = ({ bills }) => {
  const [search, setSearch] = useState('');
  const { register } = useForm<{ search: string }>();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const filtered = bills.filter((bill) => {
    const input = search.toLowerCase();
    if (
      bill.rate.toString(10).includes(input) ||
      bill.unitsUsed.toString(10).includes(input) ||
      new Date(bill.createdAt).toDateString().includes(input) ||
      bill.customerId.firstName.toLowerCase().includes(input) ||
      bill.customerId.accountNo.toLowerCase().includes(input) ||
      bill.customerId.createdBy.firstName.toLowerCase().includes(input)
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
          customerId: { firstName, accountNo, meterNo },
          rate,
          unitsUsed,
          createdBy: { firstName: employee },
          billingMonth,
          status,
          createdAt
        }) => {
          return {
            _id,
            rate,
            status,
            meterNo: `${meterNo}`,
            employee,
            firstName,
            accountNo,
            unitsUsed,
            totalAmount: `₦${unitsUsed * rate}`,
            month: Utils.getMonth(billingMonth),
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
        accessor: 'firstName'
      },
      {
        Header: 'Account No',
        accessor: 'accountNo'
      },
      {
        Header: 'Meter No',
        accessor: 'meterNo'
      },
      {
        Header: 'Month',
        accessor: 'month'
      },
      {
        Header: 'Created By',
        accessor: 'employee'
      },
      {
        Header: 'Rate',
        accessor: 'rate',
        isNumeric: true
      },
      {
        Header: 'Units Used',
        accessor: 'unitsUsed',
        isNumeric: true
      },
      {
        Header: 'Amount',
        accessor: 'totalAmount',
        isNumeric: true
      },
      {
        Header: 'Date',
        accessor: 'createdAt'
      }
    ],
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    // @ts-ignore
    useTable({ columns, data });

  return (
    <div>
      <Box width='30em'>
        <Input
          id='search'
          value={search}
          {...register('search')}
          onChange={handleChange}
          placeholder='Search'
        />
      </Box>
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
          {rows.map((row) => {
            prepareRow(row);
            return (
              <Tr {...row.getRowProps()}>
                {row.cells.map((cell) => (
                  <Td {...cell.getCellProps()}>{cell.render('Cell')}</Td>
                ))}
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    </div>
  );
};

export default BillTable;
