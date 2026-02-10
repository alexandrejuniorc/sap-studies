import { Customers } from '@models/sales';

export interface CustomerController {
    afterRead(customers: Customers): Customers;
}
