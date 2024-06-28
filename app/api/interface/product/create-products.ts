import { Product } from "@prisma/client";
import Decimal from "decimal.js";
import { IHttpRequest, IHttpResponse } from "../http/http";

export interface INewProduct {
    name: string;
    description: string;
    imageUrl: string;
    price: Decimal;
    discountPercentage: number;
    restaurantId: string;
    categoryId: string;
    createdAt?: Date;

  }

export interface IcreateProductController{
// eslint-disable-next-line no-unused-vars
handle(req:IHttpRequest<INewProduct>):Promise<IHttpResponse<Product>>
}

export interface IcreateProducRepository{
    // eslint-disable-next-line no-unused-vars
    createProduct(newProduct: INewProduct): Promise<Product>
}