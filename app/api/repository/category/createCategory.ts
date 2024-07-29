import { Category } from "@prisma/client";
import { ICreateCategoryRepository, INewCatery } from "../../interface/category/create-category";
import { db } from "@/app/_lib/prisma";



class CreateCategoryRepository implements ICreateCategoryRepository{
    async  createCategory(newCategory:INewCatery):Promise<Category> {

        const newCategoryData = await db.category.create({
            data:{
                name: newCategory.name,
                imageUrl:newCategory.imageUrl,
                restaurantId: newCategory.restaurantId
            },
            include:{
                Restaurant:true
            }
        })
        return newCategoryData
}
}

export const createCategoryRepository = new CreateCategoryRepository();