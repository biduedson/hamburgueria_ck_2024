// eslint-disable-next-line no-unused-vars
import { Prisma } from "@prisma/client";
import Decimal from "decimal.js";


export interface NewProduct {
    name: string;
    description: string;
    imageUrl: string;
    price: Decimal;
    discountPercentage: number;
    restaurantId: string;
    categoryId: string;
  }

// eslint-disable-next-line no-unused-vars
  export interface ICrudProductListProps {
    products: Prisma.ProductGetPayload<{
      include: {
        category: true;
        restaurant: true;
      };
    }>[];
    category: Prisma.CategoryGetPayload<{}>;
    restaurant: Prisma.RestaurantGetPayload<{}>;
  }
 