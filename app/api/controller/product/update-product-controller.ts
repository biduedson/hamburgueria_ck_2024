import { Product } from "@prisma/client";
import { IHttpRequest, IHttpResponse } from "../../interface/http/http";
import { IUpadateProductController, IUpdateProductRepository } from "../../interface/product/update-product";
import { IFindNewProductRepository } from "../../interface/product/find-product";
import { updateProductRepository } from "../../repository/product/update-product-repository";
import { findProductRepository } from "../../repository/product/find-product";
import { IAuth } from "../../interface/auth/auth";
import { authUserSession } from "../../utils/auth";


class UpdateProductController implements IUpadateProductController{
    constructor(
            // eslint-disable-next-line no-unused-vars
        private readonly updateProductRepository: IUpdateProductRepository,
         // eslint-disable-next-line no-unused-vars
        private readonly findProductRepository: IFindNewProductRepository,
         // eslint-disable-next-line no-unused-vars
         private readonly session : IAuth
    ){}

    async handle(httpRequest: IHttpRequest<Product>): Promise<IHttpResponse<Product>> {

        const logged =   this.session;

        if(!logged){
           return{
               statusCode:401,
               body:"Não autorizado"
           }
        }

        if (!httpRequest.body) {
            return {
              statusCode: 404,
              body: "Dados não informados."
            };
          }
        try {
            
            const {id} = httpRequest.body;

            const productExinting =  await this.findProductRepository.searchProduct(id);
            if (!productExinting) {
                return {
                  statusCode: 404,
                  body: "Produto não encontrado."
                };
              }

              const  productUpdated = await this.updateProductRepository.update(httpRequest.body)
              return {
                statusCode: 200,
                body: productUpdated
              };

        } catch (error) {
            return {
                statusCode: 500,
                body: `Erro interno do servidor. ${error}`
              };
        }
    }
}

export const updateProductController = new UpdateProductController(updateProductRepository, findProductRepository, authUserSession)