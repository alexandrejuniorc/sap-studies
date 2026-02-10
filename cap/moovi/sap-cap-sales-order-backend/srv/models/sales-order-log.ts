import { randomUUID } from 'node:crypto';

interface SalesOrderLogProps {
    id: string;
    headerId: string;
    userData: string;
    orderData: string;
}

type SalesOrderLogDBProps = Omit<SalesOrderLogProps, 'headerId'> & { header_id: string };

type SalesOrderLogPropsWithoutId = Omit<SalesOrderLogProps, 'id'>;

export class SalesOrderLogModel {
    constructor(private props: SalesOrderLogProps) {}

    // ANTES DOS GETTERS, POIS, É UM MÉTODO ESTÁTICO
    public static create(props: SalesOrderLogPropsWithoutId): SalesOrderLogModel {
        const salesOrderLog = new SalesOrderLogModel({ ...props, id: randomUUID() });
        return salesOrderLog;
    }

    get id(): string {
        return this.props.id;
    }

    get headerId(): string {
        return this.props.headerId;
    }

    get userData(): string {
        return this.props.userData;
    }

    get orderData(): string {
        return this.props.orderData;
    }

    public toObject(): SalesOrderLogDBProps {
        return {
            id: this.id,
            header_id: this.headerId,
            userData: this.userData,
            orderData: this.orderData
        };
    }
}
