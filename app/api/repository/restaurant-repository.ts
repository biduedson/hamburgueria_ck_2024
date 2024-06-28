import { db } from "@/app/_lib/prisma";
import { IdRestaurant, IdRestaurantParams } from "../interface/restaurant-interfaces"

export class restaurantId implements IdRestaurant{
    
    async id(): Promise<IdRestaurantParams>{
      
      const IdRestaurant =   await db.restaurant.findFirst({
            select:{
                id:true
            }          
          });
          if(!IdRestaurant){
            return  {
                id:"",
                notFound:true
            }
         }
         return {
            id:IdRestaurant.id,
            notFound:false
        }
    }

    
}