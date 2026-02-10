import cds from '@sap/cds';
import { SalesOrderLogModel } from '../../models/sales-order-log';
import { SalesOrderLogRepository } from './protocols';

export class SalesOrderLogImplementation implements SalesOrderLogRepository {
    async create(props: SalesOrderLogModel[]): Promise<void> {
        const logs = props.map(log => log.toObject());
        await cds.create('sales.SalesOrderLogs').entries(logs);
    }
}
