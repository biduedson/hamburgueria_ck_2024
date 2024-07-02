"use client";
import { Button } from "@/app/_components/ui/button";
import { isProductFavorited } from "@/app/_helpers/restaurant";
import useToggleFavoriteRestaurants from "@/app/_hooks/use-toggle-favorite-restaurants";
import { Product, UserFavoriteProducts } from "@prisma/client";
import { ChevronLeftIcon, HeartIcon } from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface RestaurantImageProps {
  product: Pick<Product, "id" | "name" | "imageUrl">;
  userFavoriteProducts: UserFavoriteProducts[];
}

const RestaurantImage = ({
  product,
  userFavoriteProducts,
}: RestaurantImageProps) => {
  const { data } = useSession();

  const router = useRouter();

  const isFavorited = isProductFavorited(product.id, userFavoriteProducts);

  const { handleFavoriteClick } = useToggleFavoriteRestaurants({
    restaurantId: product.id,
    userId: data?.user.id,
    productsCurrentlyFavorite: isFavorited,
  });

  const handleBackclick = () => router.back();
  return (
    <div className="relative h-[250px] w-full lg:h-[380px] lg:w-[750px] xl:h-[480px] xl:w-[1280px]">
      <Image
        src={product.imageUrl}
        alt={product.name}
        fill
        className="object-cover"
      />

      <Button
        className="absolute left-2 top-2 rounded-full bg-white text-foreground hover:text-white"
        size="icon"
        onClick={handleBackclick}
      >
        <ChevronLeftIcon />
      </Button>

      <Button
        size="icon"
        className="absolute right-4 top-4  rounded-full bg-gray-700"
        onClick={handleFavoriteClick}
      >
        <HeartIcon size={20} className="fill-white" />
      </Button>
    </div>
  );
};

export default RestaurantImage;
