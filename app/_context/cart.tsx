/* eslint-disable no-unused-vars */
"use client";
import Cookies from "js-cookie";
import { Prisma, Product } from "@prisma/client";
import { ReactNode, createContext, useEffect, useMemo, useState } from "react";
import { calculateProductTotalPrice } from "../_helpers/price";
import { db } from "../_lib/prisma";

export interface CartProduct
  extends Prisma.ProductGetPayload<{
    include: {
      Restaurant: {
        select: {
          id: true;
          deliveryFee: true;
          deliveryTimeMinutes: true;
        };
      };
    };
  }> {
  quantity: number;
}

export interface ICategoryWhitProduct {
  categoriesWithProducts: Prisma.CategoryGetPayload<{
    include: {
      products: {
        include: {
          category: true;
          Restaurant: true;
        };
      };
    };
  }>[];
}

interface ICartContext {
  products: CartProduct[];
  categoriesWithProducts: ICategoryWhitProduct | [];
  subTotalPrice: number;
  totalPrice: number;
  totalDiscounts: number;
  totalQuantity: number;
  addProductToCArt: ({
    product,
    emptyCart,
  }: {
    product: CartProduct;
    emptyCart?: boolean;
  }) => void;
  decreaseProductQuantity: (productId: string) => void;
  increaseProductQuantity: (productId: string) => void;
  removeProductFronCart: (productId: string) => void;
  clearCart: () => void;
}

export const CartContext = createContext<ICartContext>({
  products: [],
  categoriesWithProducts: [],
  subTotalPrice: 0,
  totalPrice: 0,
  totalDiscounts: 0,
  totalQuantity: 0,
  addProductToCArt: () => {},
  decreaseProductQuantity: () => {},
  increaseProductQuantity: () => {},
  removeProductFronCart: () => {},
  clearCart: () => {},
});

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const initialState = Cookies.get("cart")
    ? JSON.parse(Cookies.get("cart")!)
    : [];
  const [categoriesWithProducts, setCategoriesWithProducts] = useState<
    ICategoryWhitProduct | []
  >([]);
  const [products, setProducts] = useState<CartProduct[]>(initialState);

  //carregar o cart armazenado nos cookies a cada mudança no carproduct
  useEffect(() => {
    Cookies.set("cart", JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/api/getCategoryWhitProducts");
      const data = await response.json();
      setCategoriesWithProducts(data);
    };
    fetchData();
  }, []);
  //anteriormente se usava useMemo porem como só tem um estado que  possa ser alterado não há necessidade
  const subTotalPrice = products.reduce((acc, product) => {
    return acc + Number(product.price) * product.quantity;
  }, 0);

  const totalPrice =
    products.reduce((acc, product) => {
      return acc + calculateProductTotalPrice(product) * product.quantity;
    }, 0) + Number(products?.[0]?.Restaurant?.deliveryFee);

  const totalQuantity = products.reduce((acc, product) => {
    return acc + product.quantity;
  }, 0);

  const totalDiscounts =
    subTotalPrice - totalPrice + Number(products?.[0]?.Restaurant?.deliveryFee);

  const clearCart = () => {
    return setProducts([]);
  };

  const decreaseProductQuantity: ICartContext["decreaseProductQuantity"] = (
    productId: string
  ) => {
    return setProducts((prev) =>
      prev.map((cartProduct) => {
        if (cartProduct.id === productId) {
          if (cartProduct.quantity === 1) {
            return cartProduct;
          }
          return {
            ...cartProduct,
            quantity: cartProduct.quantity - 1,
          };
        }
        return cartProduct;
      })
    );
  };

  const increaseProductQuantity: ICartContext["increaseProductQuantity"] = (
    productId: string
  ) => {
    return setProducts((prev) =>
      prev.map((cartProduct) => {
        if (cartProduct.id === productId) {
          return {
            ...cartProduct,
            quantity: cartProduct.quantity + 1,
          };
        }
        return cartProduct;
      })
    );
  };

  const removeProductFronCart: ICartContext["removeProductFronCart"] = (
    productId: string
  ) => {
    return setProducts((prev) =>
      prev.filter((product) => product.id !== productId)
    );
  };

  const addProductToCArt: ICartContext["addProductToCArt"] = ({
    product,
    emptyCart,
  }) => {
    // VERIFICAR SE ALGUM  PRODUTO DE OUTRO RESTAURANTE NO CARRINHO
    if (emptyCart) {
      setProducts([]);
    }

    //VERIFICAR SE  O PRODUTO JA ESTA NO CARRINHO
    const isProductAlreadyOnCart = products.some(
      (cartProduct) => cartProduct.id === product.id
    );

    //SE ELE ESTIVER AUMENTAR SUA QUANTIDADE
    if (isProductAlreadyOnCart) {
      return setProducts((prev) =>
        prev.map((cartProduct) => {
          if (cartProduct.id === product.id) {
            return {
              ...cartProduct,
              quantity: cartProduct.quantity + product.quantity,
            };
          }

          return cartProduct;
        })
      );
    }

    // SE NÃO ,ADICIONA - LO COM A QUANTIDADE RECEBIDA

    setProducts((prev) => [...prev, product]);
  };
  return (
    <CartContext.Provider
      value={{
        products,
        categoriesWithProducts,
        subTotalPrice,
        totalPrice,
        totalDiscounts,
        totalQuantity,
        clearCart,
        addProductToCArt,
        decreaseProductQuantity,
        increaseProductQuantity,
        removeProductFronCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
