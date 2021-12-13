import BaseAPIService from './BaseAPISerice';

export default class CustomerAPIService extends BaseAPIService {
  public static async addNewCustomer(payload: AddCustomerPayload) {
    return new Promise(async (resolve) => {
      try {
        const { data } = await this.instance.post<NoDataResponse>(
          `/employee/customer`,
          payload,
          this.config
        );

        resolve(data);
      } catch (err) {
        this.errorHandler(err);
      }
    });
  }

  public static async fetchCustomers(): Promise<
    DataResponse<GetCustomerResponse[]>
  > {
    return new Promise(async (resolve) => {
      try {
        const { data } = await this.instance.get<
          DataResponse<GetCustomerResponse[]>
        >(`/customer`, this.config);

        resolve(data);
      } catch (err) {
        this.errorHandler(err);
      }
    });
  }
}
