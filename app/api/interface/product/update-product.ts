import { Product } from "@prisma/client";
import { IHttpRequest, IHttpResponse } from "../http/http";


export interface IUpdateProductParams{
    id: string;
}

export interface IUpadateProductController{
    // eslint-disable-next-line no-unused-vars
    handle(httpRequest:IHttpRequest<Product>):Promise<IHttpResponse<Product>>
}

export interface IUpdateProductRepository{
    // eslint-disable-next-line no-unused-vars
    update(params:Product):Promise<Product>
}