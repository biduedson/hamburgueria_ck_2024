"use client";
import { Restaurant } from "@prisma/client";
import Image from "next/image";

interface RestaurantImageProps {
  restaurant: Pick<Restaurant, "id" | "name" | "imageUrl">;
}

const RestaurantImage = ({ restaurant }: RestaurantImageProps) => {
  return (
    <div className="relative h-[250px] w-full lg:h-[380px] lg:w-[750px] xl:h-[480px] xl:w-[1280px]">
      <Image
        src={restaurant.imageUrl}
        alt={restaurant.name}
        fill
        className="object-cover"
      />
    </div>
  );
};

export default RestaurantImage;
