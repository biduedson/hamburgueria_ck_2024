import { db } from "@/app/_lib/prisma";
import { IGetCategories, IGetCategoriesRepository } from "../../interface/category/get-categories";



class GetCategoriesRepository implements IGetCategoriesRepository{


    async getCategories():Promise<IGetCategories>{
        
        const categories = await db.category.findMany({
            include:{
                products:{
                    include:{
                        category:true,
                        Restaurant:true
                    }
                }
            }
        })
        return categories
    }
}

export const  getCategoriesRepository = new GetCategoriesRepository()