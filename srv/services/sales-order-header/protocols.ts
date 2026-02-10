import { SalesOrderHeader, type SalesOrderHeaders } from '@models/sales';
import { User } from '@sap/cds';

export type ValidateCreationPayloadResult = {
    hasError: boolean;
    totalAmount?: number;
    error?: Error;
};

export interface SalesOrderHeaderService {
    beforeCreate(props: SalesOrderHeader): Promise<ValidateCreationPayloadResult>;
    afterCreate(props: SalesOrderHeaders, loggedUser: User): Promise<void>;
}
