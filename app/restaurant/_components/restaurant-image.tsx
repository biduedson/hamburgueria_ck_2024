"use client";
import { Restaurant } from "@prisma/client";
import Image from "next/image";

interface RestaurantImageProps {
  restaurant: Pick<Restaurant, "id" | "name" | "imageUrl">;
}

const RestaurantImage = ({ restaurant }: RestaurantImageProps) => {
  return (
    <div className="relative   h-[250px] md:h-[420px] w-full  lg:w-[750px] xl:h-[480px] xl:w-[1280px]">
      <Image
        src={restaurant.imageUrl}
        alt={restaurant.name}
        fill
        className="lg:object-contain sm:object-cover md:object-cover xl:object-contain object-contain "
        sizes="(max-width: 480px) 90vw, 32px"
      />
    </div>
  );
};

export default RestaurantImage;
