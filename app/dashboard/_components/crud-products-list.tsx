"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/app/_components/ui/table";
import Image from "next/image";
import { formatCurrency } from "@/app/_helpers/price";
import { EditIcon, TrashIcon } from "lucide-react";
import ProductEditItemCard from "./item-card/product-edit-item-card";
import { Button } from "@/app/_components/ui/button";
import ProductForm from "./form/product-form";
import AlertDialagDeleteProduct from "./alert-dialogs/alert-dialog-delete-product";
import AlertDialogError from "./alert-dialogs/aleert-dialog-error";
import { ICrudProductListProps } from "../types/products-interface";
import useProductForm from "@/app/hooks/use-products-form";

const CrudProductsList = ({
  products,
  category,
  restaurant,
}: ICrudProductListProps) => {
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
    price,
    setIsConfirmDialogOpen,
    handleInputChange,
    handlePriceChange,
    handleFocus,
    handleBlur,
    handleImageChange,
    addProduct,
    deleteProduct,
    setDialogErrorOpen,
    alertDialogErrorFunction,
    resetNewProduct,
    setEmptyErrorMessage,
    setImageUrl,
    setNewProduct,
    setActiveBtn,
    setOpenModal,
    setBtnOpen,
    setPrice,
  } = useProductForm({ products, category, restaurant });
  return (
    <>
      <div className="flex w-full   flex-wrap items-center justify-center gap-2 overflow-y-auto bg-[#E5E5E5] lg:flex lg:flex-col">
        <div className="hidden  w-full lg:block">
          <div className="flex w-full  justify-between py-4 ">
            <h1 className="text-md font-bold">Produtos</h1>
            <div className="py-2 ">
              <Button
                className="rounded-[4px] bg-customRed hover:bg-[#FEAF00] hover:text-black"
                onClick={() => {
                  setOpenModal(!openModal);
                  setEmptyErrorMessage("");
                }}
              >
                Adicinar Produto
              </Button>
            </div>
          </div>
          <Table className=" mb-3 ">
            <TableHeader>
              <TableRow>
                <TableHead>Foto do Produto</TableHead>
                <TableHead>Nome do produto</TableHead>
                <TableHead>Preço</TableHead>
                <TableHead>Disconto</TableHead>
                <TableHead>Descrição</TableHead>
                <TableHead>Categoria</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="w-full">
              {currentProducts.map((product) => (
                <TableRow
                  key={product.id}
                  className="my-2 rounded-sm bg-[#ffffff] "
                >
                  <TableCell>
                    <div className="relative h-[60px] w-[60px]">
                      <Image
                        src={product.imageUrl}
                        alt={product.name}
                        fill
                        className="rounded-sm object-cover"
                        sizes="(max-width: 60px) 100vw, (max-width: 120px) 50vw, 33vw"
                      />
                    </div>
                  </TableCell>
                  <TableCell>{product.name}</TableCell>
                  <TableCell>{formatCurrency(Number(product.price))}</TableCell>
                  <TableCell>{product.discountPercentage}%</TableCell>
                  <TableCell>
                    {product.description.length > 10
                      ? product.description.substring(0, 10)
                      : product.description}
                    ...
                  </TableCell>
                  <TableCell>{product.category.name}</TableCell>
                  <TableCell className="flex gap-2">
                    <div className="flex cursor-pointer flex-col items-center">
                      <EditIcon width={20} height={20} />
                      <span className="tex text-sm font-semibold text-yellow-500">
                        Editar
                      </span>
                    </div>
                    <div
                      className="flex cursor-pointer flex-col items-center"
                      onClick={() => {
                        setIsConfirmDialogOpen(true);
                      }}
                    >
                      <TrashIcon width={20} height={20} />
                      <span className="tex text-sm font-semibold text-red-600">
                        Deletar
                      </span>
                    </div>
                  </TableCell>
                  <AlertDialagDeleteProduct
                    isConfirmDialogOpen={isConfirmDialogOpen}
                    setIsConfirmDialogOpen={() => setIsConfirmDialogOpen(false)}
                    isSubmitLoading={isSubmitLoading}
                    deleteProduct={async () => deleteProduct(product.id)}
                    product={product}
                    emptyErrorMessage={emptyErrorMessage}
                  />
                  <AlertDialogError
                    dialogErrorOpen={dialogErrorOpen}
                    setDialogErrorOpen={setDialogErrorOpen}
                    emptyErrorMessage={emptyErrorMessage}
                    alertDialogActionError={alertDialogErrorFunction}
                    isSubmitLoading={isSubmitLoading}
                  />
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <div className="flex min-h-full w-full flex-wrap items-center  gap-2 lg:hidden">
          <div className="flex w-full justify-between py-4 ">
            <h1 className="text-sm font-bold">Produtos</h1>
            <Button
              className="rounded-[4px] bg-customRed hover:bg-[#FEAF00] hover:text-black"
              onClick={() => setOpenModal(!openModal)}
            >
              Adicinar Produto
            </Button>
          </div>
          {currentProducts.map((product) => (
            <ProductEditItemCard
              key={product.id}
              product={product}
              deleteProduct={() => deleteProduct(product.id)}
            />
          ))}
        </div>
        <ProductForm
          restaurantId={restaurant.id}
          categoryId={category.id}
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
            resetNewProduct(restaurant.id, category.id);
            setPrice("");
          }}
          handleInputChange={handleInputChange}
          handlePriceChange={handlePriceChange}
          handleFocus={handleFocus}
          handleBlur={handleBlur}
          handleImageChange={handleImageChange}
          localImageUrl={localImageUrl}
          price={price}
          addProduct={() => addProduct(restaurant.id, category.id)}
          isSubmitLoading={isSubmitLoading}
          openModal={openModal}
        />
      </div>
    </>
  );
};

export default CrudProductsList;
