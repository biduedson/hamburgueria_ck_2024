import Decimal from "decimal.js";

export interface IAccount {
    id: string;
    userId: string;
    type: string;
    provider: string;
    providerAccountId: string;
    refresh_token?: string;
    access_token?: string;
    expires_at?: number;
    token_type?: string;
    scope?: string;
    id_token?: string;
    session_state?: string;
  }

 export interface ISession {
    id: string;
    sessionToken: string;
    userId: string;
    expires: Date;
    user: IUser;
  }

 export interface IUser {
    id: string;
    name?: string;
    email?: string;
    emailVerified?: Date;
    image?: string;
    accounts: IAccount[];
    sessions: ISession[];
    orders: IOrder[];
    restaurant?: IRestaurant;
    favoriteProducts: IUserFavoriteProducts[];
  }

  interface IUserFavoriteProducts {
    userId: string;
    user: IUser;
    productId: string;
    product: IProduct;
    createdAt: Date;
  }
  export interface IVerificationToken {
    identifier: string;
    token: string;
    expires: Date;
  }

  export interface IRestaurant {
    id: string;
    name: string;
    imageUrl: string;
    deliveryFee: Decimal;
    deliveryTimeMinutes: number;
    ownerId: string;
    owner: IUser;
    categories: ICategory[];
    products: IProduct[];
    orders: IOrder[];
  }
  export interface ICategoryWithProducts {
    categoriesWithProducts: {
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
          deliveryFee: Decimal;
          deliveryTimeMinutes: number;
          ownerId: string;
        };
        createdAt: Date;
      }[];
    }[];
  }
  export interface ICategory {
    id: string;
    name: string;
    imageUrl: string;
    restaurants: IRestaurant[];
    products: IProduct[];
    createdAt: Date;
  }

  export interface IProduct {
    id: string;
    name: string;
    description: string;
    imageUrl: string;
    price: Decimal;
    discountPercentage: number;
    restaurantId: string;
    restaurant: IRestaurant;
    categoryId: string;
    category: ICategory;
    createdAt: Date;
    orderProducts: IOrderProduct[];
    usersWhoFavorited: IUserFavoriteProducts[];
  }

  export interface IOrderProduct {
    id: string;
    orderId: string;
    order: IOrder;
    productId: string;
    product: IProduct;
    quantity: number;
  }

  export interface IOrder {
    id: string;
    userId: string;
    user: IUser;
    products: IOrderProduct[];
    restaurantId: string;
    restaurant: IRestaurant;
    deliveryFee: Decimal;
    deliveryTimeMinutes: number;
    subTotalPrice: Decimal;
    totalPrice: Decimal;
    totalDiscounts: Decimal;
    createdAt: Date;
    status: OrderStatus;
  }
 export enum OrderStatus {
    
    CONFIRMED = "CONFIRMED",
    CANCELED = "CANCELED",
    PREPARING = "PREPARING",
    DELIVERING = "DELIVERING",
    COMPLETED = "COMPLETED",
  }