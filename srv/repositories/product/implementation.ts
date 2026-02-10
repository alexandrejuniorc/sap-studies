import cds from '@sap/cds';

import { ProductModel, ProductProps } from '../../models/product';
import { ProductRepository } from './protocols';
import { Products } from '@models/sales';

export class ProductRepositoryImplementation implements ProductRepository {
    public async findManyByIds(productIds: ProductProps['id'][]): Promise<ProductModel[] | null> {
        const FIND_MANY_PRODUCTS_BY_ID_QUERY = SELECT.from('sales.Products').where({ id: productIds });
        const products: Products = await cds.run(FIND_MANY_PRODUCTS_BY_ID_QUERY);

        if (products.length === 0) {
            return null;
        }

        return products.map(product =>
            ProductModel.create({
                id: product.id as string,
                name: product.name as string,
                price: product.price as number,
                stock: product.stock as number
            })
        );
    }

    public async updateStock(product: ProductModel): Promise<void> {
        const UPDATE_PRODUCT_STOCK_QUERY = UPDATE('sales.Products')
            .where({ id: product.id })
            .with({ stock: product.stock });

        await cds.run(UPDATE_PRODUCT_STOCK_QUERY);
    }
}
