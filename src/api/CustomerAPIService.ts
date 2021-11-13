import axios from 'axios';
import BaseAPIService from './BaseAPISerice';

export default class CustomerAPIService extends BaseAPIService {
  public static async addNewCustomer(payload: AddCustomerPayload) {
    return new Promise(async (resolve, reject) => {
      try {
        const { data } = await axios.post<NoDataResponse>(
          `${this.baseUrl}/employee/customer`,
          payload,
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
