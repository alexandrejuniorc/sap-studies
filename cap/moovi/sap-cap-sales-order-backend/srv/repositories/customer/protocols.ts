import { CustomerModel, CustomerProps } from '../../models/customer';

export interface CustomerRepository {
    findById(customerId: CustomerProps['id']): Promise<CustomerModel | null>;
}
