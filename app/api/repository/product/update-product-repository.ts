import { Product } from "@prisma/client";
import { IUpdateProductRepository } from "../../interface/product/update-product";
import { db } from "@/app/_lib/prisma";



class UpdateProductRepository implements IUpdateProductRepository{
   async  update(params:Product):Promise<Product>{
        const [curentProduct] = await db.product.findMany({
            where:{
                id: params.id
            }
        })

        const productUpdated = await db.product.update({
            where:{
                id: params.id
            },
            data:{
                name: params.name || curentProduct.name,
                description: params.description || curentProduct.description,
                price: params.price || curentProduct.price,
                imageUrl: params.imageUrl || curentProduct.imageUrl,
                discountPercentage: params.discountPercentage || curentProduct.discountPercentage,
                restaurantId: params.restaurantId,
                categoryId:params.categoryId || curentProduct.categoryId

            }
        });
        return productUpdated
    }
}

export const updateProductRepository = new UpdateProductRepository()