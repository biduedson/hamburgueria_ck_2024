"use client";
import { Product, UserFavoriteProducts } from "@prisma/client";
import { notFound, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { searchForProducts } from "../_actions/search";
import Header from "@/app/_components/header";
import RestaurantItem from "@/app/_components/restaurant-item";

interface IRestaurantsProps {
  userFavoriteProducts: UserFavoriteProducts[];
}
const Products = ({ userFavoriteProducts }: IRestaurantsProps) => {
  const searchParams = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const searchFor = searchParams.get("search");

  useEffect(() => {
    const fetchRestaurant = async () => {
      if (!searchFor) return;
      const foundRestaurants = await searchForProducts(searchFor);
      setProducts(foundRestaurants);
    };
    fetchRestaurant();
  }, [searchFor]);

  if (!searchFor) {
    return notFound();
  }

  return (
    <>
      <Header isSearch={true} />
      <div className="px-5 py-6">
        <h2 className="mb-6 text-lg font-semibold">
          {products.length === 0
            ? "Restaurante não encontrado"
            : `Resultados para "${searchFor}"`}
        </h2>
        <div className="flex w-full flex-col gap-6 ">
          {products.map((product) => (
            <RestaurantItem
              key={product.id}
              product={product}
              className="min-w-full max-w-full"
              userFavoriteProducts={userFavoriteProducts}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default Products;
