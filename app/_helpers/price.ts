import { Product } from "@prisma/client";

export const calculateProductTotalPrice = (product: Product): number =>{
   if(product.discountPercentage === 0){
    return Number(product.price)
   } 

   const discount = Number(product.price) * (product.discountPercentage /100);
   return Number(product.price )- discount;
}

export const formatCurrency = (value: number): string =>{
    return  `R$${Intl.NumberFormat("pt-BR", {
        currency:"BRL",
<<<<<<< HEAD
        maximumFractionDigits: 2,
=======
        minimumFractionDigits: 2,
>>>>>>> e9c9f266372820f995b32bb02b78b4d84162adc0
    }).format(value)}`;
}