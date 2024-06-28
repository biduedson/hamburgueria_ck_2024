
export interface IdRestaurantParams {
    id: string;
    notFound: boolean;
    
  }

export interface IdRestaurantRepository{
    id:() => Promise<IdRestaurantParams>
}


export interface IdRestaurantController{

}