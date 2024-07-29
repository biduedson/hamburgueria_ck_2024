"use client";
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

export interface IRestaurant {
  id: string;
  name: string;
  imageUrl: string;
  deliveryFee: Decimal; // Decimal
  deliveryTimeMinutes: number;
  ownerId: string;
  categories: ICategory[];
  products: IProduct[];
}

// Representa uma categoria
export interface ICategory {
  id: string;
  name: string;
  imageUrl: string;
  createdAt: Date;
  restaurantId:string | null ;
  products: {
    id: string;
    name: string;
    description: string;
    imageUrl: string;
    price: Decimal; // Decimal
    discountPercentage: number;
    restaurantId: string | null;
    categoryId: string;
    createdAt: Date;
    category: {
      id: string;
      name: string;
      imageUrl: string;
      createdAt: Date;
    };
    Restaurant: {
      id: string;
      name: string;
      imageUrl: string;
      deliveryFee: Decimal; // Decimal
      deliveryTimeMinutes: number;
      ownerId: string;
    } | null;
  }[];
}

// Representa um produto
export interface IProduct {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  price: Decimal; // Decimal
  discountPercentage: number;
  restaurantId: string;
  categoryId: string;
  createdAt: Date;
  category: {
    id: string;
    name: string;
    imageUrl: string;
    createdAt: Date;
  };
  Restaurant: {
    id: string;
    name: string;
    imageUrl: string;
    deliveryFee: Decimal; // Decimal
    deliveryTimeMinutes: number;
    ownerId: string;
  };
}

// Representa as propriedades do componente de produto CRUD
export interface ICrudProductComponentProps {
  products: IProduct[];
  restaurant: IRestaurant;
  categories: ICategory[];
  category: {
    id: string;
    name: string;
    imageUrl: string;
    createdAt: Date;
  };
}
export interface ICrudCategoriesComponentProps {
  categories: ICategory[];
  restaurant: IRestaurant;
}

export interface IDashboardProps {
  restaurant: {
    id: string;
    name: string;
    imageUrl: string;
    deliveryFee: Decimal; // Decimal
    deliveryTimeMinutes: number;
    ownerId: string;
  };
  product?:IProduct;
  category: ICategory;
  categories: ICategory[];
  orders?: IOrder[];
  orderStatus:OrderStatus

}
export interface ICategoryWithProducts {
  id: string;
  name: string;
  imageUrl: string;
  createdAt: Date;
  products: {
    id: string;
    name: string;
    description: string;
    imageUrl: string;
    price: Decimal;
    discountPercentage: number;
    category: ICategory;
    restaurant: {
      id: string;
      name: string;
      imageUrl: string;
      deliveryFee: Decimal;
      deliveryTimeMinutes: number;
      ownerId: string;
    };
    createdAt: Date;
  }[];

}

export interface IResponse {
  messageError?: string;
  emptyError: boolean;
}

export interface NewCategory {
  name: string;
  imageUrl: string;
  restaurantId: string;
 
}

export interface IOrder {
  id: string;
  userId: string;
  deliveryFee: Decimal;
  deliveryTimeMinutes: number;
  subTotalPrice: Decimal;
  totalPrice: Decimal;
  totalDiscounts: Decimal;
  createdAt: Date;
  status: string;
  restaurantId: string | null;
  Restaurant: IRestaurant | null;
  products: IProduct[];
}

enum OrderStatus {
  CONFIRMED,
  CANCELED,
  PREPARING,
  DELIVERING,
  COMPLETED
}
