import { CustomerCardProps } from '../components/CustomerCard';

export const employee: Employee = {
  email: 'fask;@aflj.com',
  _id: 'employee',
  firstName: 'Employee',
  lastName: 'Nice nice',
  createdAt: '2021-11-13T22:51:34.675Z',
  createdBy: {
    _id: 'admin',
    firstName: 'Admin',
    lastName: 'Super',
    adminId: 'id',
    createdAt: '2021-11-13T22:51:34.675Z',
    type: 'admin'
  },
  employeeId: 'empid',
  type: 'employee'
};

export const customer: Customer = {
  email: 'john@gmail.com',
  _id: 'customer',
  address: 'faiow',
  createdAt: '2021-11-13T22:51:34.675Z',
  meterNo: 12783,
  firstName: 'Customer',
  lastName: 'Good',
  accountNo: 'lfkdsjoirqw',
  createdBy: {
    _id: 'employee',
    firstName: 'Employee',
    lastName: 'Nice nice',
    createdAt: '2021-11-13T22:51:34.675Z',
    createdBy: {
      _id: 'admin',
      firstName: 'Admin',
      lastName: 'Super',
      adminId: 'id',
      createdAt: '2021-11-13T22:51:34.675Z',
      type: 'admin'
    },
    employeeId: 'empid',
    email: 'fjdksapi@hkfjsa.com',
    type: 'employee'
  },
  type: 'customer'
};

export const admin: Admin = {
  _id: 'admin',
  firstName: 'Admin',
  lastName: 'Super',
  adminId: 'id',
  createdAt: '2021-11-13T22:51:34.675Z',
  type: 'admin'
};

export const bill: Bill = {
  _id: 'test',
  status: 'Valid',
  rate: 10,
  unitsUsed: 345.4,
  createdAt: '2021-11-13T22:51:34.675Z',
  billingMonth: 9,
  createdBy: {
    _id: 'employee',
    firstName: 'Employee',
    lastName: 'Nice nice',
    createdAt: '2021-11-13T22:51:34.675Z',
    createdBy: {
      _id: 'admin',
      firstName: 'Admin',
      lastName: 'Super',
      adminId: 'id',
      createdAt: '2021-11-13T22:51:34.675Z',
      type: 'admin'
    },
    email: 'fjdksapi@hkfjsa.com',
    employeeId: 'empid',
    type: 'employee'
  },
  customerId: {
    _id: 'customer',
    email: 'john@gmail.com',
    address: 'faiow',
    createdAt: '2021-11-13T22:51:34.675Z',
    meterNo: 12783,
    firstName: 'Customer',
    lastName: 'Good',
    accountNo: 'lfkdsjoirqw',
    createdBy: {
      _id: 'employee',
      firstName: 'Employee',
      lastName: 'Nice nice',
      createdAt: '2021-11-13T22:51:34.675Z',
      createdBy: {
        _id: 'admin',
        firstName: 'Admin',
        lastName: 'Super',
        adminId: 'id',
        createdAt: '2021-11-13T22:51:34.675Z',
        type: 'admin'
      },
      employeeId: 'empid',
      type: 'employee',
      email: 'fjdksapi@hkfjsa.com'
    },
    type: 'customer'
  }
};

export const payment: Payment = {
  _id: 'id',
  amount: 5000,
  reference: 'djaiewqsdafjkl',
  createdAt: '2021-11-13T22:51:34.675Z',
  status: 'successful',
  customerId: customer,
  proofStatus: 'Valid'
};

export const customerCard: CustomerCardProps = {
  ...customer,
  totalBill: 10000,
  totalPayment: 7654,
  cardType: 'employee'
};
