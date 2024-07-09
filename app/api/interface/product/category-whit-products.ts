import { Prisma } from "@prisma/client";
import { IHttpResponse } from "../http/http";

export interface ICategoryWhitProduct{
    categoriesWithProducts: Prisma.CategoryGetPayload<{
      include: {
        products: {
          include: {
            category: true;
            restaurant: true;
          };
        };
      };
    }>[];
  }



  export interface IGetCategoriyWhitProductsController{
    handle():Promise<IHttpResponse<ICategoryWhitProduct>>
  }
  export interface IGetCategoriyWhitProductsRepository{
    get():Promise<ICategoryWhitProduct>
  }