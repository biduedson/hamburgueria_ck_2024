import { IAuth } from "../../interface/auth/auth";
import { IHttpResponse } from "../../interface/http/http";
import { ICategoryWhitProduct, IGetCategoriyWhitProductsController, IGetCategoriyWhitProductsRepository } from "../../interface/category/category-whit-products";
import { categoryWhitProductsRepository } from "../../repository/category/categoryWhitProducts";
import { authUserSession } from "../../utils/auth";



class GetCategoryWhitController implements IGetCategoriyWhitProductsController{
    
    constructor (
        // eslint-disable-next-line no-unused-vars
        private readonly getCategoryWhitProducts: IGetCategoriyWhitProductsRepository,
         // eslint-disable-next-line no-unused-vars
        private readonly session : IAuth
    ){}
    async handle(): Promise<IHttpResponse<ICategoryWhitProduct>> {

        const logged =  this.session;

        if(!logged){
           return{
               statusCode:401,
               body:"Não autorizado"
           }
        }

        
        try {
            const categoryWhiteProducts = await this.getCategoryWhitProducts.get()
            console.log(categoryWhiteProducts)
            
            return {
                statusCode: 200,
                body:categoryWhiteProducts
            }
        } catch (error) {
            return {
                statusCode: 500,
                body:"Erro interno do servidor"
            }
        }
    }
}

export const getCategoryWhitController = new GetCategoryWhitController(categoryWhitProductsRepository,authUserSession)