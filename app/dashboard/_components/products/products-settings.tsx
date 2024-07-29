"use client";

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/app/_components/ui/tabs";
import CrudProductsList from "../crud-products-list";
import { ICategory, IDashboardProps } from "../../types/types-dashoboard";
import { useEffect, useState } from "react";

const ProductSettingscomponents = ({
  restaurant,
  categories,
  orderStatus,
}: IDashboardProps) => {
  const [dataCategories, setDataCategories] = useState<ICategory[] | []>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchCategoriesWhitProducts = async () => {
      try {
        const response = await fetch("/api/getCategoryWhitProducts");
        const data = await response.json();
        setDataCategories(data);
      } catch (error) {
        console.log("Erro ao buscar produtos", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCategoriesWhitProducts();
  }, []);

  if (!restaurant) {
    return (
      <h1 className="px-5 py-6 text-sm font-bold lg:px-12 xl:px-24 2xl:px-28">
        Voce não tem restaurante cadastrado.
      </h1>
    );
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-full">
        <div className="loader">Carregando...</div>
      </div>
    );
  }

  if (!dataCategories.length) {
    return (
      <h1 className="px-5 py-6 text-sm font-bold lg:px-12 xl:px-24 2xl:px-28">
        É preciso ao menos uma categoria cadastrada para cadastrar algum
        produto.
      </h1>
    );
  }
  return (
    <Tabs defaultValue="account" className="item center flex w-full flex-col ">
      <TabsList className="flex  h-[50px]  w-full gap-2 bg-[#E5E5E5] px-3 md:px-0">
        <h1 className="lg:text-[14px] font-semibold  text-black smartphoneSm:text-[12px]">
          Selecione o produto.
        </h1>
        {dataCategories.map((category) => (
          <TabsTrigger
            key={category.id}
            value={category.name}
            className="rounded-[5px] bg-customRed text-white"
          >
            {category.name}
          </TabsTrigger>
        ))}
      </TabsList>
      {dataCategories.map((category) => (
        <TabsContent
          key={category.id}
          value={category.name}
          className=" h-full"
        >
          <div className="min-h-full w-full bg-[#E5E5E5] px-3 ">
            <CrudProductsList
              key={category.id}
              category={category}
              restaurant={restaurant}
              products={category.products}
              orderStatus={orderStatus}
            />
          </div>
        </TabsContent>
      ))}
    </Tabs>
  );
};

export default ProductSettingscomponents;
