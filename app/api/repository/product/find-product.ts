import { db } from "@/app/_lib/prisma";
import { IFindNewProductRepository } from "../../interface/product/find-product";


class FindProductRepository implements IFindNewProductRepository{

    async searchProduct(name:string):Promise<boolean>{
        const product = await db.product.findFirst({
            where:{
            name:name
            }
        })
    return product !== null;
}
}

export const findProductRepository = new FindProductRepository()