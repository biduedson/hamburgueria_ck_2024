import { IHttpResponse } from "../../interface/http/http";
import { ICategoryWhitProduct, IGetCategoriyWhitProductsController, IGetCategoriyWhitProductsRepository } from "../../interface/product/category-whit-products";
import { categoryWhitProductsRepository } from "../../repository/product/categoryWhitProducts";



class GetCategoryWhitController implements IGetCategoriyWhitProductsController{
    // eslint-disable-next-line no-unused-vars
    constructor (private readonly getCategoryWhitProducts: IGetCategoriyWhitProductsRepository){}
    async handle(): Promise<IHttpResponse<ICategoryWhitProduct>> {
        
        try {
            const categoryWhiteProducts = await this.getCategoryWhitProducts.get()
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

export const getCategoryWhitController = new GetCategoryWhitController(categoryWhitProductsRepository)