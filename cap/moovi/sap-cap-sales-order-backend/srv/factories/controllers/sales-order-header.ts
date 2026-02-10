import { SalesOrderHeaderControllerImplementation } from '../../controllers/sales-order-header/implementation';
import { SalesOrderHeaderController } from '../../controllers/sales-order-header/protocols';
import { salesOrderHeaderService } from '../services/sales-order-header';

const makeSalesOrderHeaderController = (): SalesOrderHeaderController => {
    return new SalesOrderHeaderControllerImplementation(salesOrderHeaderService);
};

export const salesOrderHeaderController = makeSalesOrderHeaderController();
