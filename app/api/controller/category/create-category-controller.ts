import { Category } from "@prisma/client";
import { ICreateCategoryRepository, ICrerateCategoryController, INewCatery } from "../../interface/category/create-category";
import { IHttpRequest, IHttpResponse } from "../../interface/http/http";
import { createCategoryRepository } from "../../repository/category/createCategory";
import { authUserSession } from "../../utils/auth";
import { IAuth } from "../../interface/auth/auth";
import { IFindCategoryRepository } from "../../interface/category/find-category";
import { findCategoryRepository } from "../../repository/category/find-category";



class CreateCategoryController implements ICrerateCategoryController{
    constructor(
        // eslint-disable-next-line no-unused-vars
        private readonly createCategoryRepository: ICreateCategoryRepository,

       // eslint-disable-next-line no-unused-vars
        private readonly findCategoryRepository: IFindCategoryRepository,

          // eslint-disable-next-line no-unused-vars
        private readonly session : IAuth

    ){}
    async   handle(req:IHttpRequest<INewCatery>):Promise<IHttpResponse<Category>> {

        const logged =  this.session;

        if(!logged){
           return{
               statusCode:401,
               body:"Não autorizado"
           }
        }

        if(!req.body){
            return{
                statusCode:400,
                body: "Dados não informados."
            }
          }

         try {
            const {name} = req.body;

            const categoryExisting = await this.findCategoryRepository.searchCategory(name);
            if(categoryExisting){
                return {
                    statusCode:400,
                    body:"Ja existe  uma categoria cadastrada com este nome."
                }
            }
            const newCategory = await this.createCategoryRepository.createCategory(req.body);
            
            return {
                statusCode:201,
                body:newCategory
            }
         } catch (error) {
            return{
                statusCode:500,
                body: "Erro interno do servidor"
            }
         }
        
    }
}

export const createCategoryController = new CreateCategoryController(createCategoryRepository, findCategoryRepository, authUserSession)