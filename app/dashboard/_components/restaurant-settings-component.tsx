"use client";

import Image from "next/image";

import { IDashboardProductsProps } from "../types/types-dashoboard";
import Header from "@/app/_components/header";
import { Button } from "@/app/_components/ui/button";
import {
  GalleryHorizontal,
  HomeIcon,
  ShoppingBasket,
  UtensilsCrossed,
} from "lucide-react";
import { ReactElement, useState } from "react";
import ProductSettingscomponents from "./products/products-settings";

const RestaurantSettingsComponent = ({
  restaurant,
  categories,
}: IDashboardProductsProps) => {
  const [menuComponent, setMenucomponent] = useState<ReactElement>(
    <h1 className="w-full flex justify-center">
      Selecione no menu ao lado o que deseja modificar.
    </h1>
  );
  const handleMenuClick = (component: ReactElement) => {
    console.log("Menu item clicked:", component);

    setMenucomponent(component);
  };
  if (!restaurant) {
    return (
      <h1 className="px-5 py-6 text-sm font-bold lg:px-12 xl:px-24 2xl:px-28">
        Voce não tem restaurante cadastrado.
      </h1>
    );
  }
  if (!categories) {
    return (
      <h1 className="px-5 py-6 text-sm font-bold lg:px-12 xl:px-24 2xl:px-28">
        Voce não tem categorias cadastradas.
      </h1>
    );
  }

  return (
    <>
      <div className="mb-2 h-[200px] w-full bg-customRed md:mb-0 md:flex md:h-full md:w-[270px] md:flex-col md:items-center">
        <div className="  flex flex-col items-center">
          <h1 className="my-2 text-sm font-semibold text-white">Dashboard</h1>
        </div>
        <div className="relative m-2  hidden h-[50px] w-[50px] rounded-full md:mt-12  md:flex md:h-[100px] md:w-[100px]">
          <Image
            src={restaurant.imageUrl}
            alt={restaurant.name!}
            fill
            className="absolute left-1 top-1 rounded-full object-cover shadow-md "
          />
        </div>

        <div className=" flex flex-col items-center">
          <h1 className="py-2 text-sm font-semibold text-white">
            {restaurant.name}
          </h1>
          <span className="font-sm text-[12px] text-[#FEAF00]">
            Administração
          </span>
        </div>
        <div className="grid h-auto grid-cols-2 gap-1 md:flex md:w-[193px] md:flex-col md:space-y-4 md:pt-12">
          <Button
            className="flex h-[41px] w-full justify-start gap-1  rounded-[4px]  pl-12 text-xs font-bold  hover:bg-[#FEAF00] hover:text-[black]"
            onClick={() =>
              handleMenuClick(
                <h1 className="w-full flex justify-center">
                  Selecione no menu ao lado o que deseja modificar.
                </h1>
              )
            }
          >
            <HomeIcon width={16} hanging={16} />
            Home
          </Button>
          <Button
            className="flex h-[41px] w-full justify-start  gap-1  rounded-[4px] pl-12 text-start text-xs font-bold  hover:bg-[#FEAF00] hover:text-[black]"
            onClick={() =>
              handleMenuClick(
                <ProductSettingscomponents
                  categories={categories}
                  restaurant={restaurant}
                />
              )
            }
          >
            <ShoppingBasket width={16} hanging={16} />
            Produtos
          </Button>
          <Button className="flex h-[41px] w-full justify-start gap-1 rounded-[4px] pl-12 text-start text-xs font-bold  hover:bg-[#FEAF00] hover:text-[black]">
            <GalleryHorizontal width={16} hanging={16} />
            Categorias
          </Button>
          <Button className="flex h-[41px] w-full justify-start  gap-1 rounded-[4px] pl-12 text-start text-xs font-bold  hover:bg-[#FEAF00] hover:text-[black]">
            <UtensilsCrossed width={16} hanging={16} />
            Restaurante
          </Button>
        </div>
      </div>

      <div className="min-h-full w-full overflow-y-scroll  [&::-webkit-scrollbar]:hidden  ">
        <div className="hidden w-full md:flex">
          <Header isSearch={true} />
        </div>
        {menuComponent}
      </div>
    </>
  );
};

export default RestaurantSettingsComponent;
