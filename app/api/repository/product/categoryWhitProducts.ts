import { db } from "@/app/_lib/prisma";
import { ICategoryWhitProduct, IGetCategoriyWhitProductsRepository } from "../../interface/product/category-whit-products";

class CategoryWhitProductsRepository implements IGetCategoriyWhitProductsRepository{
    async get(): Promise<ICategoryWhitProduct> {
      const categoriesWithProducts = await db.category.findMany({
              include:{
              products:{
                include:{
                  category:true,
                  Restaurant:true
                }
              }}
            })
          return {categoriesWithProducts};
           
       }
   
}

export const categoryWhitProductsRepository = new CategoryWhitProductsRepository();