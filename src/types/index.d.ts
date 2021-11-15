interface DataResponse<T extends Record<string, any> | string> {
  data: T;
  message: string;
  status: boolean;
}

interface NoDataResponse {
  data: null;
  message: string;
  status: boolean;
}

interface Customer {
  _id: string;
  email: string;
  address: string;
  createdAt: string;
  meterNo: number;
  lastName: string;
  firstName: string;
  accountNo: string;
  middleName?: string;
  type: 'customer';
  createdBy: Employee;
}

interface Employee {
  _id: string;
  createdAt: string;
  lastName: string;
  createdBy: Admin;
  firstName: string;
  password?: string;
  type: 'employee';
  employeeId: string;
  email: string;
}

interface Admin {
  _id: string;
  adminId: string;
  createdAt: string;
  lastName: string;
  firstName: string;
  type: 'admin';
  password?: string;
}

interface UserLoginPayload {
  userId: string;
  password: string;
}

type User = Customer | Employee;

type UserLoginResponse = User & { token: string };

type UserType = 'employee' | 'customer';

interface GetCustomerResponse extends Customer {
  totalBill: number;
  totalPayment: number;
}

type AlertType = 'error' | 'warning' | 'success';

type Alert = {
  id?: string;
  title: string;
  type: AlertType;
  message: string;
};

interface CustomerBillPayload {
  rate: number;
  userId: string;
  unitsUsed: number;
  billingMonth: number;
}

type ProofStatus = 'Pending' | 'Submitted' | 'Valid' | 'Unproven';

interface Bill {
  _id: string;
  rate: number;
  status: 'Valid';
  unitsUsed: number;
  createdAt: string;
  createdBy: Employee;
  customerId: Customer;
  billingMonth: number;
}

interface PaymentPayload {
  email: string;
  amount: number;
  channel: 'card';
}

interface Payment {
  _id: string;
  amount: number;
  reference: string;
  createdAt: string;
  status: 'successful';
  customerId: Customer;
  proofStatus: ProofStatus;
}

interface AddCustomerPayload {
  email: string;
  address: string;
  meterNo: number;
  lastName: string;
  password: string;
  firstName: string;
  accountNo: string;
  middleName: string;
}

interface LoginFormValues {
  userId: string;
  password: string;
}
