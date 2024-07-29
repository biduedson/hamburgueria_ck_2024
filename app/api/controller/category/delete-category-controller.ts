import { Category } from "@prisma/client";
import { IDeleteCategoryController, IDeleteCategoryParams, IDeleteCategoryRepository } from "../../interface/category/delete-category";
import { IFindCategoryRepository } from "../../interface/category/find-category";
import { IHttpRequest, IHttpResponse } from "../../interface/http/http";
import { deleteCategoryRepository } from "../../repository/category/delete-category";
import { findCategoryRepository } from "../../repository/category/find-category";
import { IAuth } from "../../interface/auth/auth";
import { authUserSession } from "../../utils/auth";


class DeleteCategoryController implements IDeleteCategoryController{
    constructor(
                // eslint-disable-next-line no-unused-vars
        private readonly findCategoryRepository: IFindCategoryRepository,
                // eslint-disable-next-line no-unused-vars
        private readonly deleteCategoryRepository: IDeleteCategoryRepository,
               // eslint-disable-next-line no-unused-vars
        private readonly session : IAuth       
    ) { }

    async handle(httpRequest: IHttpRequest<{ params: IDeleteCategoryParams; }>): Promise<IHttpResponse<Category>> {
        const logged =  this.session;
        const  id  = httpRequest.params;
        console.log(id)
        if(!logged){
           return{
               statusCode:401,
               body:"Não autorizado"
           }
        }

        if(!httpRequest.params){
            return{
                statusCode:400,
                body: "Id não informado."
            }
          }
        try {
            
        const checkExistingCategory = await this.findCategoryRepository.searchCategory(id)

        if(checkExistingCategory){
            return{
                statusCode: 404,
                body:"Categoria não encontrada"
            }
        }

        await this.deleteCategoryRepository.deleteCategory({id})
        return{
            statusCode: 200,
            body:"Categoria deletada com sucesso"
        }
        } catch (error) {
            return{
                statusCode: 500,
                body: `Erro interno do servidor. ${error}`
            }
        }


    }
}

export const deleteCategoryController = new DeleteCategoryController( findCategoryRepository,deleteCategoryRepository, authUserSession)