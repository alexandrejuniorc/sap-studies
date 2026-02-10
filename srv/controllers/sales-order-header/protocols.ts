import { SalesOrderHeader, SalesOrderHeaders } from '@models/sales';
import { ValidateCreationPayloadResult } from '../../services/sales-order-header/protocols';
import { User } from '@sap/cds';

export interface SalesOrderHeaderController {
    beforeCreate(props: SalesOrderHeader): Promise<ValidateCreationPayloadResult>;
    afterCreate(props: SalesOrderHeaders, loggedUser: User): Promise<void>;
}
