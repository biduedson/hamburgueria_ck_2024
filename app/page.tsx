import { db } from "@/app/_lib/prisma";
import { notFound } from "next/navigation";
import RestaurantImage from "./restaurant/_components/restaurant-image";
import Image from "next/image";
import { ChevronRightIcon, StarIcon } from "lucide-react";
import Deliveryinfo from "@/app/_components/delivery-info";
import ProductList from "@/app/_components/productList";
import CartBanner from "./restaurant/_components/cart-banner";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/_lib/auth";
import { Button } from "@/app/_components/ui/button";
import Link from "next/link";
import Header from "@/app/_components/header";
import { Separator } from "@/app/_components/ui/separator";
import CategoryList from "./_components/categoryList";

const RestaurantPage = async () => {
  const restaurant = await db.restaurant.findFirst({
    include: {
      categories: {
        orderBy: {
          createdAt: "desc",
        },
        include: {
          products: {
            include: {
              Restaurant: true,
              category: true,
            },
          },
        },
      },
      products: {
        take: 10,
        include: {
          Restaurant: true,
          category: true,
        },
      },
    },
  });

  if (!restaurant) {
    return notFound();
  }
  const session = await getServerSession(authOptions);
  const userFavoriteProducts = await db.userFavoriteProducts.findMany({
    where: {
      userId: session?.user.id,
    },
  });

  return (
    <>
      <div className=" w-full flex">
        <Header isSearch={true} />
      </div>
      <Separator className="mt-3 hidden lg:flex" />
      <div className="items-center lg:flex lg:w-full lg:flex-col  lg:items-center lg:px-12 lg:py-4 xl:px-16 2xl:px-28">
        <div className=" w-full lg:flex lg:justify-between lg:gap-6">
          <RestaurantImage restaurant={restaurant} />

          <div className="lg:flex lg:h-auto lg:w-[402px] lg:flex-col gap-4">
            <div className="relative z-50 mt-[-2.5rem] flex items-center justify-between rounded-tl-3xl rounded-tr-3xl bg-white px-5 pt-5 lg:px-0">
              {/*TITULO*/}
              <div className="flex items-center gap-[0.375rem]">
                <div className="relative h-8 w-8">
                  <Image
                    src={restaurant.imageUrl}
                    alt={restaurant.name}
                    fill
                    className="rounded-full object-contain"
                    sizes="(max-width: 468px) 100vw, 32px"
                  />
                </div>
                <div className="w-full">
                  <h1 className="text-xl font-semibold">{restaurant.name}</h1>
                </div>
              </div>

              <div className="flex items-center gap-[3px] rounded-full bg-foreground px-2 py-[2px] text-white">
                <StarIcon
                  size={12}
                  className="fill-yellow-400 text-yellow-400"
                />
                <span className="text-xs font-semibold">5.0</span>
              </div>
            </div>

            <div className="desktop hidden w-full lg:block">
              <Deliveryinfo restaurant={restaurant} />
            </div>
            <div className="relative w-full overflow-y-scroll pb-1 lg:h-[65px] [&::-webkit-scrollbar]:hidden">
              <p
                className={`${restaurant.categories.length > 0 ? "absolute right-1 top-3 hidden animate-bounce lg:block" : "hidden"}`}
              >
                &darr;
              </p>
              <div className="pt-2 hidden lg:flex">
                <CategoryList />
              </div>
            </div>
            <div className="h-auto">
              <h1 className="my-3 hidden text-[16px] font-semibold lg:block">
                Sobre
              </h1>
              <p className="hidden text-justify text-[14px] font-normal leading-[21px] lg:block">
                O SushiDojo é uma joia gastronômica que transporta seus clientes
                para o coração do Japão, com sua atmosfera serena, design
                minimalista e um balcão de sushi onde mestres habilidosos
                preparam pratos autênticos com ingredientes frescos e
                selecionados, garantindo uma experiência culinária excepcional e
                memorável.
              </p>
            </div>
          </div>
        </div>
        <div className="px-5 lg:hidden">
          <Deliveryinfo restaurant={restaurant} />
        </div>

        {/*CATEGORIAS*/}
        <h1 className=" px-4 py-2 text-xl lg:hidden  font-semibold">
          Categorias
        </h1>
        <div className="mt-3 flex  w-full gap-4 overflow-x-scroll px-5 md:items-center md:justify-center lg:hidden [&::-webkit-scrollbar]:hidden">
          <div className="pt-2 lg:hidden">
            <CategoryList />
          </div>
        </div>

        <div className="mt-6  w-full  space-y-4  lg:px-0 ">
          {/*TODO mostrar produtos mais pedidos quando implementarmos a realização de  pedidos */}
          <div className="flex w-full justify-between">
            <h2 className=" px-5 font-semibold lg:px-0">
              Pedidos Recomendados
            </h2>

            <Button
              variant="ghost"
              className="h-fit p-0 text-primary hover:bg-transparent"
              asChild
            >
              <Link href="/products/recomended">
                Ver todos
                <ChevronRightIcon size={16} />
              </Link>
            </Button>
          </div>
          <ProductList products={restaurant.products} />
        </div>

        {restaurant.categories.map((category) => (
          <div className="mt-6 w-full space-y-4  lg:px-0" key={category.id}>
            <h2 className="px-5 font-semibold lg:px-0">{category.name}</h2>
            <ProductList products={category.products} />
          </div>
        ))}

        <CartBanner restaurant={restaurant} />
      </div>
    </>
  );
};

export default RestaurantPage;
