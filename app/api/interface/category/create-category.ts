import { Category } from "@prisma/client";
import { IHttpRequest,  IHttpResponse } from "../http/http"; 

export interface INewCatery{
  id: string;
  name: string;
  imageUrl: string;
  createdAt: Date;
  restaurantId:string;
}

export interface ICrerateCategoryController{
    // eslint-disable-next-line no-unused-vars
    handle(req:IHttpRequest<INewCatery>):Promise<IHttpResponse<Category>>
}

export interface ICreateCategoryRepository{
     // eslint-disable-next-line no-unused-vars
    createCategory(newCategory:INewCatery):Promise<Category>
    
}