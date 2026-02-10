import type { ValidateCreationPayloadResult } from '../services/sales-order-header/protocols';

export interface ProductProps {
    id: string;
    name: string;
    price: number;
    stock: number;
}

export class ProductModel {
    constructor(private props: ProductProps) {}

    // ANTES DOS GETTERS, POIS, É UM MÉTODO ESTÁTICO
    public static create(props: ProductProps): ProductModel {
        const product = new ProductModel({ ...props });
        return product;
    }

    public get id(): string {
        return this.props.id;
    }

    public get name(): string {
        return this.props.name;
    }

    public get price(): number {
        return this.props.price;
    }

    public get stock(): number {
        return this.props.stock;
    }

    public set stock(stock: number) {
        this.props.stock = stock;
    }

    public sell(amount: number): ValidateCreationPayloadResult {
        const hasNotEnoughStock = this.stock < amount;
        if (hasNotEnoughStock) {
            return {
                hasError: true,
                error: new Error(
                    `Insufficient stock for product ${this.name}. Available stock: ${this.stock}, requested: ${amount}`
                )
            };
        }

        this.stock -= amount;

        return { hasError: false };
    }
}
