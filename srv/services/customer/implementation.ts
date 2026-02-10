import { Customers } from '@models/sales';
import { CustomerService } from './protocols';
import { CustomerModel } from '../../models/customer';

export class CustomerServiceImplementation implements CustomerService {
    public afterRead(customers: Customers): Customers {
        const customersList = customers.map(c => {
            const customer = CustomerModel.create({
                id: c.id as string,
                firstName: c.firstName as string,
                lastName: c.lastName as string,
                email: c.email as string
            });

            return customer.setDefaultEmailDomain().toObject();
        });

        return customersList;
    }
}
