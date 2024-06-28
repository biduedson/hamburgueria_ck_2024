"use server"

import { revalidatePath } from "next/cache"
import { db } from "../_lib/prisma"

export const toggleFavoriteRestaurant = async (
    userId:string, 
    productId:string
)=>{
 
    const isFavorite = await db.userFavoriteProducts.findFirst({
        where:{
            userId,
            productId
        },
    });

    if(isFavorite){
       await db.userFavoriteProducts.delete({
        where:{
           userId_productId:{
            userId,
            productId
           }
        }
       }) 
       revalidatePath("/")
       return
    }

    await db.userFavoriteProducts.create({
    data:{
          userId:userId,
         productId:productId,
       }
      })
      revalidatePath("/")
};