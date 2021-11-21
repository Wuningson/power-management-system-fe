import axios from 'axios';
import BaseAPIService from './BaseAPISerice';

export default class PaymentAPIService extends BaseAPIService {
  public static async generatePaymentUrl(
    payload: PaymentPayload
  ): Promise<DataResponse<string>> {
    return new Promise(async (resolve) => {
      try {
        const { data } = await axios.post<DataResponse<string>>(
          `${this.baseUrl}/payment`,
          payload,
          this.config
        );

        resolve(data);
      } catch (err) {
        this.errorHandler(err);
      }
    });
  }

  public static async fetchPayments(
    customerId: string
  ): Promise<DataResponse<Payment[]>> {
    return new Promise(async (resolve) => {
      try {
        const { data } = await axios.get<DataResponse<Payment[]>>(
          `${this.baseUrl}/payment?customerId=${customerId}`,
          this.config
        );

        resolve(data);
      } catch (err) {
        this.errorHandler(err);
      }
    });
  }
}
