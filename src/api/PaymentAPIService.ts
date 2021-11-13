import axios from 'axios';

export default class PaymentAPIService {
  private static baseUrl = 'https://final-project-power.herokuapp.com/api';
  private static config = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  };

  public static async generatePaymentUrl(payload: PaymentPayload) {
    return new Promise(async (resolve, reject) => {
      try {
        const { data } = await axios.post<DataResponse<string>>(
          `${this.baseUrl}/payment`,
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

  public static async fetchPayments(customerId: string) {
    return new Promise(async (resolve, reject) => {
      try {
        const { data } = await axios.get<DataResponse<Payment>>(
          `${this.baseUrl}/payment?customerId=${customerId}`,
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
