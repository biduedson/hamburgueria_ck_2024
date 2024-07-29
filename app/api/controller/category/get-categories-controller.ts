import { IAuth } from "../../interface/auth/auth";
import { IGetCategories, IGetCategoriesController, IGetCategoriesRepository } from "../../interface/category/get-categories";
import { IHttpResponse } from "../../interface/http/http";
import { getCategoriesRepository } from "../../repository/category/get-categories";
import { authUserSession } from "../../utils/auth";



class GetCategoriesController implements IGetCategoriesController{
    constructor(
                // eslint-disable-next-line no-unused-vars
        private readonly getCategoriesRepository: IGetCategoriesRepository,
                // eslint-disable-next-line no-unused-vars
        private readonly session : IAuth
    ){}


    async handle(): Promise<IHttpResponse<IGetCategories>> {

        const logged =  this.session;

        if(!logged){
           return{
               statusCode:401,
               body:"Não autorizado"
           }
        }
   try {
    

    const categories = await this.getCategoriesRepository.getCategories()

    return {
        statusCode: 200,
        body:categories
    }
   } catch (error) {

    return {
        statusCode: 500,
        body:"Erro interno do servidor"
    }
   }
        
    }
}

export const getCategoriesController = new GetCategoriesController(getCategoriesRepository, authUserSession)