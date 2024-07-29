import Decimal from "decimal.js";

export interface INewProduct {
    name: string;
    description: string;
    imageUrl: string;
    price: Decimal;
    discountPercentage: number;
    restaurantId: string;
    categoryId: string;
  }