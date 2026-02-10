import '../configs/module-alias';

import { Request, Service } from '@sap/cds';
import { Customers, SalesOrderHeaders } from '../../@cds-models/sales/index';
import { customerController } from '../factories/controllers/customer';
import { salesOrderHeaderController } from '../factories/controllers/sales-order-header';
import type { FullRequestParameters } from './protocols';

// The events are executed in the order they are defined in this file
export default (service: Service) => {
    // Enforce read-only access for users with 'readonly_user' role
    service.before('READ', '*', async (request: Request) => {
        const hasReadonlyAccess = request.user.is('readonly_user');
        const hasAdminAccess = request.user.is('admin');
        const hasNecessaryAccess = hasReadonlyAccess || hasAdminAccess;

        if (!hasNecessaryAccess) {
            return request.reject(403, 'Acesso negado.');
        }
    });
    // Prevent write and delete operations for all users
    service.before(['WRITE', 'DELETE'], '*', async (request: Request) => {
        const hasAdminAccess = request.user.is('admin');
        if (!hasAdminAccess) {
            return request.reject(403, 'Acesso negado.');
        }
    });
    // Ensure customer email validity
    service.after('READ', 'Customers', (results: Customers, request: Request) => {
        (request as unknown as FullRequestParameters<Customers>).results = customerController.afterRead(results);
    });
    // Validate stock before sales order creation
    service.before('CREATE', 'SalesOrderHeaders', async (request: Request) => {
        const { hasError, error, totalAmount } = await salesOrderHeaderController.beforeCreate(request.data);

        if (hasError) {
            return request.reject(400, error?.message as string);
        }

        request.data.totalAmount = totalAmount;
    });
    // Decrement stock after sales order creation
    service.after('CREATE', 'SalesOrderHeaders', async (results: SalesOrderHeaders, request: Request) => {
        await salesOrderHeaderController.afterCreate(results, request.user);
    });
};
