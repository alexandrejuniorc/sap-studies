import { SalesOrderItemModel } from './sales-order-item';
import { randomUUID } from 'node:crypto';

interface SalesOrderHeaderProps {
    id: string;
    customerId: string;
    totalAmount: number;
    items: SalesOrderItemModel[];
}

type SalesOrderHeaderPropsWithoutIdAndTotalAmount = Omit<SalesOrderHeaderProps, 'id' | 'totalAmount'>;

type ValidateCreationPayloadProps = {
    customer_id: SalesOrderHeaderProps['customerId'];
};

type ValidateCreationPayloadResult = {
    hasError: boolean;
    error?: Error;
};

export class SalesOrderHeaderModel {
    constructor(private props: SalesOrderHeaderProps) {}

    // ANTES DOS GETTERS, POIS, É UM MÉTODO ESTÁTICO
    public static create(props: SalesOrderHeaderPropsWithoutIdAndTotalAmount): SalesOrderHeaderModel {
        const salesOrderHeader = new SalesOrderHeaderModel({ ...props, id: randomUUID(), totalAmount: 0 });
        return salesOrderHeader;
    }

    public static with(props: SalesOrderHeaderProps): SalesOrderHeaderModel {
        return new SalesOrderHeaderModel(props);
    }

    public get id(): string {
        return this.props.id;
    }

    public get customerId(): string {
        return this.props.customerId;
    }

    public get totalAmount(): number {
        return this.props.totalAmount;
    }

    public set totalAmount(amount: number) {
        this.props.totalAmount = amount;
    }

    public get items(): SalesOrderItemModel[] {
        return this.props.items;
    }

    // DEPOIS DOS GETTERS, POIS, É UM MÉTODO DE INSTÂNCIA
    public validateCreationPayload(params: ValidateCreationPayloadProps): ValidateCreationPayloadResult {
        const { hasError: hasCustomerError, error: customerError } = this.validateCustomerExists(params.customer_id);
        if (hasCustomerError) {
            return {
                hasError: true,
                error: customerError
            };
        }

        const { hasError: hasProductError, error: productError } = this.validateProductExists(this.items);
        if (hasProductError) {
            return {
                hasError: true,
                error: productError
            };
        }

        return {
            hasError: false
        };
    }

    private validateCustomerExists(customerId: string): ValidateCreationPayloadResult {
        if (!customerId) {
            return {
                hasError: true,
                error: new Error('Cliente Inválido.')
            };
        }

        return { hasError: false };
    }

    private validateProductExists(items: SalesOrderHeaderProps['items']): ValidateCreationPayloadResult {
        if (!items || items.length === 0) {
            return {
                hasError: true,
                error: new Error('Itens Inválidos.')
            };
        }

        const itemsWithError: string[] = [];

        items.forEach(item => {
            const { hasError, error } = item.validateCreationPayload({ product_id: item.productId });
            if (hasError) {
                itemsWithError.push(error?.message as string);
            }
        });

        if (itemsWithError.length > 0) {
            const errorMessages = itemsWithError.join('\n -');

            return {
                hasError: true,
                error: new Error(errorMessages)
            };
        }

        return { hasError: false };
    }

    public calculateTotalAmount(): number {
        let totalAmount = 0;
        this.items.forEach(item => {
            totalAmount += item.price * item.quantity;
        });

        return totalAmount;
    }

    public calculateDiscount(): number {
        let totalAmount = this.calculateTotalAmount();
        const THIRTY_THOUSAND = 30000;

        if (totalAmount > THIRTY_THOUSAND) {
            const discount = totalAmount * (10 / 100); // 10% discount
            totalAmount -= discount;
        }

        return totalAmount;
    }

    public findProducts(): { id: string; quantity: number }[] {
        const products = this.items.map(item => ({
            id: item.productId,
            quantity: item.quantity
        }));

        return products;
    }

    public toStringifiedObject(): string {
        return JSON.stringify(this.props);
    }
}
