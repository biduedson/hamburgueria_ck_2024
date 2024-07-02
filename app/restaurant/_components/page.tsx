import { Suspense } from "react";
import Restaurants from "../../../restaurant/components/restaurants";
import { getServerSession } from "next-auth";
import { authOptions } from "../../_lib/auth";
import { db } from "../../_lib/prisma";

const ProductsPage = async () => {
  const session = await getServerSession(authOptions);
  const userFavoriteProducts = await db.userFavoriteProducts.findMany({
    where: {
      userId: session?.user.id,
    },
  });

  return (
    <Suspense>
      <Restaurants userFavoriteProducts={userFavoriteProducts} />;
    </Suspense>
  );
};

export default ProductsPage;
