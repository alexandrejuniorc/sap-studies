import cds from '@sap/cds';

import { CustomerModel, CustomerProps } from '../../models/customer';
import { CustomerRepository } from './protocols';

export class CustomerRepositoryImplementation implements CustomerRepository {
    public async findById(customerId: CustomerProps['id']): Promise<CustomerModel | null> {
        const FIND_CUSTOMER_BY_ID_QUERY = SELECT.one.from('sales.Customers').where({ id: customerId });
        const customer = await cds.run(FIND_CUSTOMER_BY_ID_QUERY);

        if (!customer) {
            return null;
        }

        return CustomerModel.create({
            id: customer.id as string,
            firstName: customer.firstName as string,
            lastName: customer.lastName as string,
            email: customer.email as string
        });
    }
}
