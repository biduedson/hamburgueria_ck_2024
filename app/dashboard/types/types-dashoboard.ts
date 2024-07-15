"use client";
import Decimal from "decimal.js";

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
  category?: ICategory;
  categories: ICategory[];
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
