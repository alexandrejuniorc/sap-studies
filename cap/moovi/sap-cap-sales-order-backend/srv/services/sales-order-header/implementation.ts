import { SalesOrderHeader, SalesOrderHeaders } from '@models/sales';
import { User } from '@sap/cds';
import { CustomerModel } from '../../models/customer';
import { LoggedUserModel } from '../../models/logged-user';
import { ProductModel } from '../../models/product';
import { SalesOrderHeaderModel } from '../../models/sales-order-header';
import { SalesOrderItemModel } from '../../models/sales-order-item';
import { SalesOrderLogModel } from '../../models/sales-order-log';
import { CustomerRepository } from '../../repositories/customer/protocols';
import { ProductRepository } from '../../repositories/product/protocols';
import { SalesOrderLogRepository } from '../../repositories/sales-order-log/protocols';
import { SalesOrderHeaderService, ValidateCreationPayloadResult } from './protocols';

export class SalesOrderHeaderImplementation implements SalesOrderHeaderService {
    constructor(
        private readonly customerRepository: CustomerRepository,
        private readonly salesOrderLogRepository: SalesOrderLogRepository,
        private readonly productRepository: ProductRepository
    ) {}

    public async beforeCreate(props: SalesOrderHeader): Promise<ValidateCreationPayloadResult> {
        const products = await this.findManyProductsByIds(props);

        if (!products) {
            return {
                hasError: true,
                error: new Error('Nenhum produto encontrado para os itens do pedido de venda.')
            };
        }

        const salesOrderItems = this.findSalesOrderItems(props, products);
        const salesOrderHeader = this.findSalesOrderHeader(props, salesOrderItems);
        const customer = await this.findCustomerById(props.customer_id as string);

        if (!customer) {
            return {
                hasError: true,
                error: new Error(`Cliente ${props.customer_id} não encontrado.`)
            };
        }

        const { hasError: hasSalesOrderHeaderError, error: salesOrderHeaderError } =
            salesOrderHeader.validateCreationPayload({
                customer_id: customer.id
            });

        if (hasSalesOrderHeaderError) {
            return {
                hasError: hasSalesOrderHeaderError,
                error: salesOrderHeaderError
            };
        }

        return {
            hasError: false,
            totalAmount: salesOrderHeader.calculateDiscount()
        };
    }

    public async afterCreate(props: SalesOrderHeaders, loggedUser: User): Promise<void> {
        const headerAsArray = Array.isArray(props) ? props : ([props] as SalesOrderHeaders);
        const logs: SalesOrderLogModel[] = [];

        for (const header of headerAsArray) {
            const products = (await this.findManyProductsByIds(header)) as ProductModel[];
            const salesOrderItems = this.findSalesOrderItems(header, products);
            const salesOrderHeader = this.findExistingSalesOrderHeader(header, salesOrderItems);
            const productsData = salesOrderHeader.findProducts();

            for (const product of products) {
                const foundProduct = productsData.find(product => product.id === product.id);
                product.sell(foundProduct?.quantity as number);
                await this.productRepository.updateStock(product);
            }

            const user = this.findLoggedUser(loggedUser);
            const log = this.findSalesOrderLog(salesOrderHeader, user);

            logs.push(log);
        }

        await this.salesOrderLogRepository.create(logs);
    }

    private async findManyProductsByIds(props: SalesOrderHeader): Promise<ProductModel[] | null> {
        const productIds: string[] = props.items?.map(item => item.product_id) as string[];
        const products = await this.productRepository.findManyByIds(productIds);

        return products;
    }

    private findSalesOrderItems(props: SalesOrderHeader, products: ProductModel[]): SalesOrderItemModel[] {
        const salesOrderItems = props.items?.map(item =>
            SalesOrderItemModel.create({
                price: item.price as number,
                productId: item.product_id as string,
                quantity: item.quantity as number,
                products
            })
        ) as SalesOrderItemModel[];

        return salesOrderItems;
    }

    private findSalesOrderHeader(props: SalesOrderHeader, items: SalesOrderItemModel[]): SalesOrderHeaderModel {
        const salesOrderHeader = SalesOrderHeaderModel.create({
            customerId: props.customer_id as string,
            items
        });

        return salesOrderHeader;
    }

    private findExistingSalesOrderHeader(props: SalesOrderHeader, items: SalesOrderItemModel[]): SalesOrderHeaderModel {
        const salesOrderHeader = SalesOrderHeaderModel.with({
            id: props.id as string,
            customerId: props.customer_id as string,
            totalAmount: props.totalAmount as number,
            items
        });

        return salesOrderHeader;
    }

    private async findCustomerById(customerId: string): Promise<CustomerModel | null> {
        const customer = await this.customerRepository.findById(customerId);
        return customer;
    }

    private findLoggedUser(loggedUser: User): LoggedUserModel {
        return LoggedUserModel.create({
            id: loggedUser.id,
            roles: loggedUser.roles as string[],
            attributes: {
                id: loggedUser.attr.id as unknown as number,
                groups: loggedUser.attr.groups as unknown as string[]
            }
        });
    }

    private findSalesOrderLog(salesOrderHeader: SalesOrderHeaderModel, user: LoggedUserModel): SalesOrderLogModel {
        return SalesOrderLogModel.create({
            headerId: salesOrderHeader.id,
            userData: user.toStringifiedObject(),
            orderData: salesOrderHeader.toStringifiedObject()
        });
    }
}
