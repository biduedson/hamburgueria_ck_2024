import { Category } from "@prisma/client";
import { IHttpRequest, IHttpResponse } from "../http/http";

export interface IDeleteCategoryParams {
    id: string;
  }
  

export interface IDeleteCategoryController{
        // eslint-disable-next-line no-unused-vars
 handle(httpRequest:IHttpRequest<{params: IDeleteCategoryParams}>):Promise<IHttpResponse<Category>>
}

export interface IDeleteCategoryRepository{
        // eslint-disable-next-line no-unused-vars
    deleteCategory(params:IDeleteCategoryParams):Promise<void>
}