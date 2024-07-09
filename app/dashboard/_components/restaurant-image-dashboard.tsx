import Image from "next/image";
import { db } from "../../_lib/prisma";

const RestaurantImageDashboard = async () => {
  const restaurant = await db.restaurant.findMany({});
  if (!restaurant) {
    <h1>Sem imagem</h1>;
  }

  return (
    <>
      <div className="relative m-2  hidden h-[50px] w-[50px] rounded-full md:mt-12  md:flex md:h-[100px] md:w-[100px]">
        <Image
          src={restaurant[0].imageUrl}
          alt={restaurant[0].name!}
          fill
          className="absolute left-1 top-1 rounded-full object-cover shadow-md "
        />
      </div>
      <div className=" flex flex-col items-center">
        <h1 className="py-2 text-sm font-semibold text-white">
          {restaurant[0].name}
        </h1>
        <span className="font-sm text-[12px] text-[#FEAF00]">
          Administração
        </span>
      </div>
    </>
  );
};

export default RestaurantImageDashboard;
