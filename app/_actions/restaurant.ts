"use server"

import { revalidatePath } from "next/cache"
import { db } from "../_lib/prisma"
revalidatePath

export const toggleFavoriteRestaurant = async (
    userId:string, 
<<<<<<< HEAD
    productId:string
)=>{
 
    const isFavorite = await db.userFavoriteProducts.findFirst({
        where:{
            userId,
            productId
=======
    restaurantId:string
)=>{
 
    const isFavorite = await db.userFavoriteRestaurants.findFirst({
        where:{
            userId,
            restaurantId
>>>>>>> e9c9f266372820f995b32bb02b78b4d84162adc0
        },
    });

    if(isFavorite){
<<<<<<< HEAD
       await db.userFavoriteProducts.delete({
        where:{
           userId_productId:{
            userId,
            productId
=======
       await db.userFavoriteRestaurants.delete({
        where:{
           userId_restaurantId:{
            userId,
            restaurantId
>>>>>>> e9c9f266372820f995b32bb02b78b4d84162adc0
           }
        }
       }) 
       revalidatePath("/")
       return
    }

<<<<<<< HEAD
    await db.userFavoriteProducts.create({
    data:{
          userId:userId,
         productId:productId,
=======
    await db.userFavoriteRestaurants.create({
    data:{
          userId:userId,
         restaurantId:restaurantId,
>>>>>>> e9c9f266372820f995b32bb02b78b4d84162adc0
       }
      })
      revalidatePath("/")
};

