import BaseAPIService from './BaseAPISerice';

export default class BillAPIService extends BaseAPIService {
  public static addCustomerBill(customerBill: CustomerBillPayload) {
    return new Promise(async (resolve) => {
      try {
        const { data } = await this.instance.post<NoDataResponse>(
          `/bill`,
          customerBill,
          this.config
        );

        resolve(data);
      } catch (err) {
        this.errorHandler(err);
      }
    });
  }

  public static async fetchBills(
    customerId: string
  ): Promise<DataResponse<Bill[]>> {
    return new Promise(async (resolve) => {
      try {
        const { data } = await this.instance.get<DataResponse<Bill[]>>(
          `/bill?customerId=${customerId}`,
          this.config
        );

        resolve(data);
      } catch (err) {
        this.errorHandler(err);
      }
    });
  }

  public static async fetchBillById(billId: string) {
    return new Promise(async (resolve) => {
      try {
        const { data } = await this.instance.get<DataResponse<Bill>>(
          `/bill/${billId}`,
          this.config
        );

        resolve(data);
      } catch (err) {
        this.errorHandler(err);
      }
    });
  }
}
