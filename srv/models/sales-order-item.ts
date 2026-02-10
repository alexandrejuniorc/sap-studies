import { ProductModel } from './product';
import { randomUUID } from 'node:crypto';

export interface SalesOrderItemProps {
    id: string;
    productId: string;
    quantity: number;
    price: number;
    products: ProductModel[];
}

type SalesOrderItemPropsWithoutId = Omit<SalesOrderItemProps, 'id'>;

type ValidateCreationPayloadProps = {
    product_id: SalesOrderItemProps['productId'];
};

type ValidateCreationPayloadResult = {
    hasError: boolean;
    error?: Error;
};

export class SalesOrderItemModel {
    constructor(private props: SalesOrderItemProps) {}

    // ANTES DOS GETTERS, POIS, É UM MÉTODO ESTÁTICO
    public static create(props: SalesOrderItemPropsWithoutId): SalesOrderItemModel {
        const salesOrderItem = new SalesOrderItemModel({ ...props, id: randomUUID() });
        return salesOrderItem;
    }

    public get id(): string {
        return this.props.id;
    }

    public get productId(): string {
        return this.props.productId;
    }

    public get quantity(): number {
        return this.props.quantity;
    }

    public get price(): number {
        return this.props.price;
    }

    public get products(): ProductModel[] {
        return this.props.products;
    }

    // DEPOIS DOS GETTERS, POIS, É UM MÉTODO DE INSTÂNCIA
    public validateCreationPayload(props: ValidateCreationPayloadProps): ValidateCreationPayloadResult {
        const product = this.products.find(product => product.id === props.product_id);
        if (!product) {
            return {
                hasError: true,
                error: new Error(`Produto ${props.product_id} não encontrado.`)
            };
        }

        const hasNoProductStock = product.stock === 0;
        if (hasNoProductStock) {
            return {
                hasError: true,
                error: new Error(`Produto ${product.name}(${product.id}) sem estoque disponível.`)
            };
        }

        return { hasError: false };
    }
}
