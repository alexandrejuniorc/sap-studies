import type { SalesOrderLogModel } from '../../models/sales-order-log';

export interface SalesOrderLogRepository {
    create(props: SalesOrderLogModel[]): Promise<void>;
}
