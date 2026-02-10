import { CustomerServiceImplementation } from '../../services/customer/implementation';
import { CustomerService } from '../../services/customer/protocols';

const makeCustomerService = (): CustomerService => {
    return new CustomerServiceImplementation();
};

export const customerService = makeCustomerService();
