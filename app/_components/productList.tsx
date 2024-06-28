import { Prisma } from "@prisma/client";
import ProductItem from "./productItem";

interface ProductListProps {
  products: Prisma.ProductGetPayload<{
    include: {
<<<<<<< HEAD
      restaurant: true;
      category: true;
=======
      restaurant: {
        select: {
          name: true;
        };
      };
>>>>>>> e9c9f266372820f995b32bb02b78b4d84162adc0
    };
  }>[];
}
const ProductList = ({ products }: ProductListProps) => {
  const productsToShow = Math.min(products.length, 6);
  return (
    <>
      <div className="  flex gap-4 overflow-x-scroll px-5 lg:w-full lg:overflow-x-hidden lg:px-0 [&::-webkit-scrollbar]:hidden">
        {products.slice(0, productsToShow).map((product) => (
          <div key={product.id} className="flex w-full justify-between  ">
            <ProductItem key={product.id} product={product} />
          </div>
        ))}
      </div>
    </>
  );
};

export default ProductList;
