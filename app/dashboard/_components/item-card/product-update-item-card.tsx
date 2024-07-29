"use client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/app/_components/ui/alert-dialog";
import {
  calculateProductTotalPrice,
  formatCurrency,
} from "@/app/_helpers/price";
import { Prisma } from "@prisma/client";
import { ArrowDownIcon, EditIcon, Loader2, TrashIcon } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import UpdateProductForm from "../form/update-product-form";
import useProductForm from "@/app/hooks/use-products-form";

interface IProductEditItemCardProps {
  product: Prisma.ProductGetPayload<{
    include: {
      category: true;
      Restaurant: true;
    };
  }>;
  restaurant: Prisma.RestaurantGetPayload<{}>;
}

const ProductUpdateItemCard = ({
  product,
  restaurant,
}: IProductEditItemCardProps) => {
  const {
    isSubmitLoading,
    isConfirmDialogOpen,
    currentProducts,
    imageUrl,
    localImageUrl,
    openModal,
    activeBtn,
    dialogErrorOpen,
    emptyErrorMessage,
    newProduct,
    setNewProduct,
    price,
    setIsConfirmDialogOpen,
    handleInputChange,
    handlePriceChange,
    handleFocus,
    handleBlur,
    handleImageChange,
    setLocalImageUrl,
    updateProduct,
    setDialogErrorOpen,
    alertDialogErrorFunction,
    resetNewProduct,
    setEmptyErrorMessage,
    setImageUrl,
    setActiveBtn,
    setOpenModal,
    setBtnOpen,
    setPrice,
  } = useProductForm({
    product,
    restaurant,
  });
  const [isSubmitLoading, setIsSubmiLoading] = useState(false);
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);

  return (
    <div className="w-[170px] space-y-2 py-2 ">
      <div className="relative aspect-square w-full lg:w-[135px] xl:w-[155px]  2xl:w-[180px]">
        {/* IMAGEN*/}
        <Image
          src={product.imageUrl}
          alt={product.name}
          fill
          className="rounded-lg object-cover shadow-md"
        />

        {product.discountPercentage && (
          <div className="absolute left-2 top-2 flex items-center gap-[2px] rounded-full bg-primary px-2 py-[2px] text-white">
            <ArrowDownIcon size={12} />
            <span className="text-semibold text-xs">
              {product.discountPercentage}%
            </span>
          </div>
        )}
      </div>

      {/* TITULO, PREÇO E RESTAURANTE*/}
      <div>
        <h2 className="truncate text-sm">{product.name}</h2>
        <div className="flex items-center gap-1">
          <h3 className="font-semibold">
            {formatCurrency(calculateProductTotalPrice(product))}
          </h3>
          {product.discountPercentage > 0 && (
            <span className="text-xs text-muted-foreground line-through">
              {formatCurrency(Number(product.price))}
            </span>
          )}
        </div>

        <span className="block text-xs text-muted-foreground">
          {restaurant.name}
        </span>
      </div>
      <div className="flex w-full justify-between gap-2">
        <div
          className="flex cursor-pointer flex-col items-center"
          onClick={() => setOpenModal(true)}
        >
          <EditIcon width={20} height={20} />
          <span className="tex text-sm font-semibold text-yellow-500">
            Editar
          </span>
        </div>
        <div
          className="flex cursor-pointer flex-col items-center"
          onClick={() => setIsConfirmDialogOpen(true)}
        >
          <TrashIcon width={20} height={20} />
          <span className="tex text-sm font-semibold text-red-600">
            Deletar
          </span>
        </div>
      </div>
      <AlertDialog
        open={isConfirmDialogOpen}
        onOpenChange={setIsConfirmDialogOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Deseja atualizarr este produto</AlertDialogTitle>
            <AlertDialogDescription>
              Ao finalizar o produto sera atualizado.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setIsConfirmDialogOpen(false)}>
              Cancelar
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                setIsSubmiLoading(true);
                updateProduct(restaurant.id, product.categoryId, product.id);
                setIsSubmiLoading(false);
              }}
              disabled={isSubmitLoading}
            >
              {isSubmitLoading && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              )}
              Finalizar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <UpdateProductForm
        restaurantId={restaurant.id}
        categoryId={product.categoryId}
        newProduct={newProduct}
        setNewProduct={setNewProduct}
        imageUrl={imageUrl}
        activeBtn={activeBtn}
        emptyErrorMessage={emptyErrorMessage}
        handleCancelBtn={() => {
          setEmptyErrorMessage("");
          setImageUrl(null);
          setActiveBtn((prevActiveBtn) => ({
            ...prevActiveBtn,
            newProductDto: false,
            imageUrl: false,
          }));
          setOpenModal(!openModal);
          setBtnOpen(false);
          resetNewProduct(restaurant.id, product.categoryId);
          setPrice("");
        }}
        handleInputChange={handleInputChange}
        handlePriceChange={handlePriceChange}
        handleFocus={handleFocus}
        handleBlur={handleBlur}
        handleImageChange={handleImageChange}
        localImageUrl={localImageUrl}
        price={price}
        updateProduct={() =>
          updateProduct(restaurant.id, product.categoryId, product.id)
        }
        isSubmitLoading={isSubmitLoading}
        openModal={openModal}
        setLocalImageUrl={setLocalImageUrl}
      />
    </div>
  );
};

export default ProductUpdateItemCard;
