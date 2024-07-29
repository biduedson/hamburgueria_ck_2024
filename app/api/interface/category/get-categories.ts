import { Prisma } from "@prisma/client";
import { IHttpResponse } from "../http/http";


export interface IGetCategories{
    categories: Prisma.CategoryGetPayload<{
    include:{
        products:{
            include:{
                category: true;
                Restaurant:true
            }
        }
    }
    }>[]
}


export interface IGetCategoriesController{
    handle():Promise<IHttpResponse<IGetCategories>>
}

export interface IGetCategoriesRepository{
    getCategories():Promise<IGetCategories>
}