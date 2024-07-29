import { db } from "@/app/_lib/prisma";
import { IFindCategoryRepository } from "../../interface/category/find-category";


class FindCategoryRepository implements IFindCategoryRepository{

    async searchCategory(name:string):Promise<boolean>{
        const category = await db.category.findFirst({
            where:{
            name:name
            }
        })
    return category !== null;
}
}

export const findCategoryRepository = new FindCategoryRepository()