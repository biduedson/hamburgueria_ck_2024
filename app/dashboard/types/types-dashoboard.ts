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
    products: {
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
      restaurant: {
        id: string;
        name: string;
        imageUrl: string;
        deliveryFee: Decimal; // Decimal
        deliveryTimeMinutes: number;
        ownerId: string;
      };
    }[];
  }
  
  // Representa um produto
  export  interface IProduct {
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
      restaurant: {
        id: string;
        name: string;
        imageUrl: string;
        deliveryFee: Decimal; // Decimal
        deliveryTimeMinutes: number;
        ownerId: string;
      };
  }
  
  // Representa as propriedades do componente de produto CRUD
  export  interface ICrudProductComponentProps {
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
  
  export interface IDashboardProductsProps {
    restaurant?: IRestaurant;
    category?: ICategory;
    categories?: ICategory[];
  }
  export  interface ICategoryWithProducts {
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
  