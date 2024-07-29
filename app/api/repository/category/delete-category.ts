import { db } from "@/app/_lib/prisma";
import { IDeleteCategoryParams, IDeleteCategoryRepository } from "../../interface/category/delete-category";


class DeleteCategoryRepository implements IDeleteCategoryRepository{
    // eslint-disable-next-line no-unused-vars
    async deleteCategory(params:IDeleteCategoryParams):Promise<void> {
        console.log(params.id)
        await db.category.delete({
            where:{
                id:params.id
            }
        })
}
}

export const deleteCategoryRepository = new DeleteCategoryRepository()