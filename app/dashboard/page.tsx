import Header from "@/app/_components/header";
import { authOptions } from "@/app/_lib/auth";
import { db } from "@/app/_lib/prisma";
import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";

import RestaurantSettingsComponent from "./_components/restaurant-settings-component";

const MyRestaurantSettings = async ({}) => {
  const data = await getServerSession(authOptions);

  if (!data?.user) {
    return notFound();
  }

  const restaurant = await db.restaurant.findFirst({});
  if (data?.user.id !== restaurant?.ownerId) {
    return notFound();
  }

  const categories = await db.category.findMany({
    include: {
      products: {
        include: {
          category: {
            include: {
              Restaurant: true,
            },
          },
          Restaurant: true,
        },
      },
    },
  });
  const orders = await db.order.findMany({
    include: {
      Restaurant: true,
      products: {
        include: {
          product: true,
        },
      },
    },
  });
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
        Voce não tem categoriase cadastradas no restaurante.
      </h1>
    );
  }

  return (
    <div className="relative  h-full  w-full flex-col md:flex md:flex-row ">
      <div className="w-full md:hidden">
        <Header isSearch={false} />
      </div>

      <RestaurantSettingsComponent
        restaurant={restaurant}
        categories={categories}
        orders={orders}
        key="crud-product"
      />
    </div>
  );
};

export default MyRestaurantSettings;
