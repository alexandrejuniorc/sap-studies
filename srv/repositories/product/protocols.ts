import { ProductModel, ProductProps } from '../../models/product';

export interface ProductRepository {
    findManyByIds(productIds: ProductProps['id'][]): Promise<ProductModel[] | null>;
    updateStock(product: ProductModel): Promise<void>;
}
