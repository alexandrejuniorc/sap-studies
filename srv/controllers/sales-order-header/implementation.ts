import { SalesOrderHeader, SalesOrderHeaders } from '@models/sales';
import { SalesOrderHeaderService, ValidateCreationPayloadResult } from '../../services/sales-order-header/protocols';
import { SalesOrderHeaderController } from './protocols';
import { User } from '@sap/cds';

export class SalesOrderHeaderControllerImplementation implements SalesOrderHeaderController {
    constructor(private readonly service: SalesOrderHeaderService) {}

    public async beforeCreate(props: SalesOrderHeader): Promise<ValidateCreationPayloadResult> {
        return this.service.beforeCreate(props);
    }

    public async afterCreate(props: SalesOrderHeaders, loggedUser: User): Promise<void> {
        return this.service.afterCreate(props, loggedUser);
    }
}
