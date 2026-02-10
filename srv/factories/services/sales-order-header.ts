import { CustomerRepositoryImplementation } from '../../repositories/customer/implementation';
import { ProductRepositoryImplementation } from '../../repositories/product/implementation';
import { SalesOrderLogImplementation } from '../../repositories/sales-order-log/implementation';
import { SalesOrderHeaderImplementation } from '../../services/sales-order-header/implementation';
import { SalesOrderHeaderService } from '../../services/sales-order-header/protocols';

const makeSalesOrderHeaderService = (): SalesOrderHeaderService => {
    const customerRepository = new CustomerRepositoryImplementation();
    const productRepository = new ProductRepositoryImplementation();
    const salesOrderLogRepository = new SalesOrderLogImplementation();

    return new SalesOrderHeaderImplementation(customerRepository, salesOrderLogRepository, productRepository);
};

export const salesOrderHeaderService = makeSalesOrderHeaderService();
