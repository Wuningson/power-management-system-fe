import axios from 'axios';

export default class BillAPIService {
  private static baseUrl = 'https://final-project-power.herokuapp.com/api';
  private static config = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  };

  public static addCustomerBill(customerBill: CustomerBillPayload) {
    return new Promise(async (resolve, reject) => {
      try {
        const { data } = await axios.post<NoDataResponse>(
          `${this.baseUrl}/bill`,
          customerBill,
          this.config
        );

        resolve(data);
      } catch (err) {
        console.log(err);
        reject(err);
      }
    });
  }

  public static async fetchBills(
    customerId: string
  ): Promise<DataResponse<Bill[]>> {
    return new Promise(async (resolve, reject) => {
      try {
        const { data } = await axios.get<DataResponse<Bill[]>>(
          `${this.baseUrl}/bill?customerId=${customerId}`,
          this.config
        );

        resolve(data);
      } catch (err) {
        console.log(err);
        reject(err);
      }
    });
  }

  public static async fetchBillById(billId: string) {
    return new Promise(async (resolve, reject) => {
      try {
        const { data } = await axios.get<DataResponse<Bill>>(
          `${this.baseUrl}/bill/${billId}`,
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
