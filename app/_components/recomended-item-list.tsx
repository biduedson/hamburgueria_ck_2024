import { getServerSession } from "next-auth";
import { db } from "../_lib/prisma";
import { authOptions } from "../_lib/auth";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import RestaurantItem from "./recomended-item";
interface IRestaurantListProps {
  category?: string;
}

const RecomendedItemList = async ({ category }: IRestaurantListProps) => {
  //TODO pegar restaurantes com maior numewro de pedidos
  const session = await getServerSession(authOptions);

  const userFavorites = await db.userFavoriteProducts.findMany({
    where: {
      userId: session?.user?.id,
    },
  });

  const restaurantProducts = await db.product.findMany({
    include: {
      restaurant: true,
      usersWhoFavorited: true,
    },
  });

  const restaurantsCategory = await db.restaurant.findMany({
    where: {
      categories: {
        some: {
          name: category,
        },
      },
    },
  });

  return (
    <div className="flex justify-center  ">
      <div className="flex  gap-4 overflow-x-scroll lg:hidden [&::-webkit-scrollbar]:hidden">
        {restaurantProducts.map((product) => (
          <RestaurantItem
            key={product.id}
            product={product}
            userId={session?.user?.id}
            userFavoriteProducts={userFavorites}
          />
        ))}
      </div>
      <>
        <Carousel className=" hidden w-full lg:block ">
          <CarouselContent>
            {restaurantProducts.map((product) => (
              <CarouselItem
                key={product.restaurant.id}
                className="lg:basis-1/3 "
              >
                <RestaurantItem
                  key={product.restaurant.id}
                  product={product}
                  userId={session?.user?.id}
                  userFavoriteProducts={userFavorites}
                />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </>
    </div>
  );
};

export default RecomendedItemList;
