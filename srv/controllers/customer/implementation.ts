import { Customers } from '@models/sales';
import { CustomerController } from './protocols';
import { CustomerService } from '../../services/customer/protocols';

export class CustomerControllerImplementation implements CustomerController {
    constructor(private readonly service: CustomerService) {}

    public afterRead(customers: Customers): Customers {
        return this.service.afterRead(customers);
    }
}
