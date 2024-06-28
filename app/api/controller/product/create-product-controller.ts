import { Product } from "@prisma/client";
import { IHttpRequest, IHttpResponse } from "../../interface/http/http";
import { INewProduct, IcreateProducRepository, IcreateProductController } from "../../interface/product/create-products";
import { IFindNewProductRepository } from "../../interface/product/find-product";
import { createProductRepository } from "../../repository/product/createProduct";
import { findProductRepository } from "../../repository/product/find-product";
import { authUserSession } from "../../utils/auth";



class CreateProductController implements IcreateProductController{
    
    constructor(
        // eslint-disable-next-line no-unused-vars
        private readonly createProductRepository: IcreateProducRepository,
        // eslint-disable-next-line no-unused-vars
        private readonly findProductRepository: IFindNewProductRepository,  
        // eslint-disable-next-line no-unused-vars
        private readonly session : authUserSession
    ) {}
    async handle(req:IHttpRequest<INewProduct>):Promise<IHttpResponse<Product>>{
         const logged = await  this.session;

         if(!logged){
            return{
                statusCode:401,
                body:"Não autorizado"
            }
         }
        const {name} = req.body!;
              if(!req.body){
                return{
                    statusCode:400,
                    body: "Dados não informaods."
                }
              }
        try {
            const productExisting = await this.findProductRepository.searchProduct(name);
            if(productExisting){
                return {
                    statusCode:400,
                    body:"Ja existe  um produto cadastrado com este nome."
                }
            }
            const newProduct = await this.createProductRepository.createProduct(req.body!);
            return {
                statusCode:201,
                body:newProduct
            }
        } catch (error) {
            return{
                statusCode:500,
                body: "Erro interno do servidor"
            }
        }
    }
}

export  const  createProductController = new CreateProductController(createProductRepository,findProductRepository,authUserSession)