"use client";
import Image from "next/image";
import {
  calculateProductTotalPrice,
  formatCurrency,
} from "@/app/_helpers/price";
import DiscountBadge from "@/app/_components/discount-badge";
import { Prisma } from "@prisma/client";
import { Button } from "@/app/_components/ui/button";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import Deliveryinfo from "@/app/_components/delivery-info";
import AddProductToCart from "./add-product-to-cart";
import { useState } from "react";
import ProductList from "@/app/_components/productList";

interface ProductDetailsProps {
  product: Prisma.ProductGetPayload<{
    include: {
      Restaurant: true;
    };
  }>;
  complementaryProducts: Prisma.ProductGetPayload<{}>[];

  restaurant: Prisma.RestaurantGetPayload<{
    include: {
      categories: true;
      products: true;
    };
  }>;
}

const ProductDetails = ({
  product,
  complementaryProducts,
  restaurant,
}: ProductDetailsProps) => {
  const [quantity, setQuantity] = useState(1);
  const handleIncreaseQuantityClick = () =>
    setQuantity((currentState) => currentState + 1);

  const handleDecreaseQuantityClick = () =>
    setQuantity((currentState) => {
      if (currentState === 1) return 1;
      return currentState - 1;
    });
  if (!product) {
    return <h1>Erro ao consultar produto</h1>;
  }
  if (!restaurant) {
    return <h1>Erro ao consultar restaurante</h1>;
  }
  return (
    <>
      <div>
        <div className="relative z-50 mt-[-1.5rem] rounded-tl-3xl rounded-tr-3xl   border-solid  border-[#EEEEEE] bg-white py-5 lg:my-3 lg:mt-0 lg:flex lg:h-[507px] lg:w-[552px] lg:flex-col lg:items-center lg:justify-center lg:rounded-[10px] lg:border-[1px]">
          {/* RESTAURANTE */}
          <div className="space-y-2 lg:flex lg:flex-col ">
            <div className="flex items-center gap-[0.375rem] px-5">
              <div className="relative h-6 w-6">
                <Image
                  src={restaurant.imageUrl}
                  alt={restaurant.name}
                  fill
                  className="rounded-full object-cover"
                />
              </div>
              <span className="text-xs text-muted-foreground">
                {restaurant.name}
              </span>
            </div>

            {/* NOME DO PRODUTO */}
            <h1 className="mb-2 mt-1 px-5 text-xl font-semibold">
              {product.name}
            </h1>

            {/* PREÇO DO PRODUTO E QUANTIDADE */}
            <div className="flex justify-between px-5">
              {/* PREÇO COM DESCONTO  */}
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-xl font-semibold">
                    {formatCurrency(calculateProductTotalPrice(product))}
                  </h2>
                  {product.discountPercentage > 0 && (
                    <DiscountBadge product={product} />
                  )}
                </div>

                {/* PREÇO ORIGINAL */}
                {product.discountPercentage > 0 && (
                  <p className="text-sm text-muted-foreground">
                    {formatCurrency(Number(product.price))}
                  </p>
                )}
              </div>

              {/* QUANTIDADE */}

              <div className="flex items-center gap-3">
                <Button
                  size="icon"
                  variant="ghost"
                  className="border border-solid border-muted-foreground "
                  onClick={handleDecreaseQuantityClick}
                >
                  <ChevronLeftIcon />
                </Button>
                <span className="w-4">{quantity}</span>
                <Button size="icon" onClick={handleIncreaseQuantityClick}>
                  <ChevronRightIcon />
                </Button>
              </div>
            </div>
            {/* DADOS DA ENTREGA */}

            <div className="px-5">
              <Deliveryinfo restaurant={restaurant} />
            </div>

            <div className="mt-6 space-y-3 px-5">
              <h3 className="font-semibold">Sobre</h3>
              <p className="text-sm text-muted-foreground lg:text-justify">
                {product.description}
              </p>
            </div>

            <div className="hidden lg:flex">
              <AddProductToCart product={product} quantity={quantity} />
            </div>
          </div>
        </div>
        <div className="mb-2 mt-6 space-y-3 lg:hidden lg:px-0">
          <h3 className="px-5 font-semibold">Sucos</h3>
          <ProductList products={complementaryProducts} />
        </div>
        <div className="flex justify-self-end py-2 lg:hidden">
          <AddProductToCart product={product} quantity={quantity} />
        </div>
      </div>
    </>
  );
};

export default ProductDetails;
