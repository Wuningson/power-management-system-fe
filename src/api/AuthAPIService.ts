import axios from 'axios';
import BaseAPIService from './BaseAPISerice';

export default class AuthAPIService extends BaseAPIService {
  public static async login(loginPayload: UserLoginPayload) {
    return new Promise(async (resolve, reject) => {
      const url = `${this.baseUrl}/auth`;
      try {
        const { data } = await axios.post<DataResponse<UserLoginResponse>>(
          url,
          loginPayload
        );
        resolve(this.handleSuccessfulAuthentication(data));
      } catch (err) {
        console.log(err);
        reject(err);
      }
    });
  }

  public static async handleSuccessfulAuthentication({
    data
  }: DataResponse<UserLoginResponse>) {
    const { token, _id } = data;
    localStorage.setItem('token', token);
    localStorage.setItem('_id', _id);
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;

    // Dispatch redux action here
  }

  public static async getEmployeeById(id: string) {
    return new Promise(async (resolve, reject) => {
      try {
        const { data } = await axios.get<DataResponse<Employee>>(
          `${this.baseUrl}/employee/${id}`,
          this.config
        );
        resolve(data);
      } catch (err) {
        console.log(err);
        reject(err);
      }
    });
  }

  public static async getCustomerById(id: string) {
    return new Promise(async (resolve, reject) => {
      try {
        const { data } = await axios.get<DataResponse<GetCustomerResponse>>(
          `${this.baseUrl}/customer/${id}`,
          this.config
        );
        resolve(data);
      } catch (err) {
        console.log(err);
        reject(err);
      }
    });
  }
}
