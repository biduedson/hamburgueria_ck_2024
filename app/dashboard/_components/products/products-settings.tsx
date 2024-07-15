import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/app/_components/ui/tabs";
import CrudProductsList from "../crud-products-list";
import { IDashboardProps } from "../../types/types-dashoboard";

const ProductSettingscomponents = ({
  restaurant,
  categories,
}: IDashboardProps) => {
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
        Voce não tem categorias cadastradas.
      </h1>
    );
  }
  return (
    <Tabs defaultValue="account" className="item center flex w-full flex-col ">
      <TabsList className="flex  h-[50px]  w-full gap-2 bg-[#E5E5E5] px-3 md:px-0">
        <h1 className="lg:text-[14px] font-semibold  text-black smartphoneSm:text-[12px]">
          Selecione o produto.
        </h1>
        {categories.map((category) => (
          <TabsTrigger
            key={category.id}
            value={category.name}
            className="rounded-[5px] bg-customRed text-white"
          >
            {category.name}
          </TabsTrigger>
        ))}
      </TabsList>
      {categories.map((category) => (
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
            />
          </div>
        </TabsContent>
      ))}
    </Tabs>
  );
};

export default ProductSettingscomponents;
