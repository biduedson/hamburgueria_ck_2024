import { Product } from "@prisma/client";
import { INewProduct, IcreateProducRepository } from "../../interface/product/create-products";
import { db } from "@/app/_lib/prisma";


class CreateProductRepository implements IcreateProducRepository{
    async createProduct(product: INewProduct): Promise<Product> {

        const newProduct = await db.product.create({
            data: {
                name: product.name,
                description: product.description,
                imageUrl: product.imageUrl,
                price: product.price,
                discountPercentage: product.discountPercentage,
                restaurantId:product.restaurantId,
                categoryId: product.categoryId,
            },
            include: {
                category: true,
                Restaurant: true,
              }, 
          });
          return newProduct
}
}
export const  createProductRepository =  new  CreateProductRepository();


