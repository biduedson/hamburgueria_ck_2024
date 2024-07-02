import {UserFavoriteProducts } from "@prisma/client"

export const isProductFavorited = ( productId: string, userFavoriteProducts: UserFavoriteProducts[]) =>
   userFavoriteProducts?.some((favoriteProduct) => favoriteProduct.productId === productId)
