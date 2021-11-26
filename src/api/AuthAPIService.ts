import axios from 'axios';
import BaseAPIService from './BaseAPISerice';
import AuthActionsCreator from '../actions/AuthActionsCreator';
import { EditCustomerState } from '../components/EditCustomer';

export default class AuthAPIService extends BaseAPIService {
  public static async login(
    loginPayload: UserLoginPayload
  ): Promise<{ type: UserType }> {
    return new Promise(async (resolve) => {
      const url = `${this.baseUrl}/auth`;
      try {
        const { data } = await axios.post<DataResponse<UserLoginResponse>>(
          url,
          loginPayload
        );
        resolve(this.handleSuccessfulAuthentication(data));
      } catch (err) {
        this.errorHandler(err);
      }
    });
  }

  public static async handleSuccessfulAuthentication({
    data
  }: DataResponse<UserLoginResponse>) {
    const { token, ...user } = data;
    localStorage.setItem('token', token);

    AuthActionsCreator.authenticate(user);

    return { type: user.type };
  }

  public static async getEmployeeById(id: string) {
    return new Promise(async (resolve) => {
      try {
        const { data } = await axios.get<DataResponse<Employee>>(
          `${this.baseUrl}/employee/${id}`,
          this.config
        );
        resolve(data);
      } catch (err) {
        this.errorHandler(err);
      }
    });
  }

  public static async getCustomerById(
    id: string
  ): Promise<DataResponse<GetCustomerResponse>> {
    return new Promise(async (resolve) => {
      try {
        const { data } = await axios.get<DataResponse<GetCustomerResponse>>(
          `${this.baseUrl}/customer/${id}`,
          this.config
        );
        resolve(data);
      } catch (err) {
        this.errorHandler(err);
      }
    });
  }

  public static async getEmployeeDashboardData(): Promise<
    DataResponse<EmployeeDashboard>
  > {
    return new Promise(async (resolve) => {
      try {
        const { data } = await axios.get<DataResponse<EmployeeDashboard>>(
          `${this.baseUrl}/employee/dashboard`,
          this.config
        );
        resolve(data);
      } catch (err) {
        this.errorHandler(err);
      }
    });
  }

  public static async updateCustomerById(
    id: string,
    payload: EditCustomerState
  ): Promise<DataResponse<UserLoginResponse>> {
    return new Promise(async (resolve) => {
      try {
        const { data } = await axios.post<DataResponse<UserLoginResponse>>(
          `${this.baseUrl}/customer/${id}`,
          payload,
          this.config
        );
        resolve(data);
      } catch (err) {
        this.errorHandler(err);
      }
    });
  }
}
