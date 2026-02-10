import { CustomerControllerImplementation } from '../../controllers/customer/implementation';
import { CustomerController } from '../../controllers/customer/protocols';
import { customerService } from '../services/customer';

const makeCustomerController = (): CustomerController => {
    return new CustomerControllerImplementation(customerService);
};

export const customerController = makeCustomerController();
