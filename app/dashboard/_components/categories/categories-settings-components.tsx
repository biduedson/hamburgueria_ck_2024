"use client";

import { Button } from "@/app/_components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/app/_components/ui/table";
import Image from "next/image";
import AlertDialogError from "../alert-dialogs/aleert-dialog-error";
import { EditIcon, TrashIcon } from "lucide-react";
import { IDashboardProps } from "../../types/types-dashoboard";
import useCategoriesForm from "@/app/hooks/use-categories-form";
import AlertDialagDeleteCategory from "../alert-dialogs/alert-dialog-delete-category";
import CategorytEditItemCard from "../item-card/category-edit-item-card";
import CategoryForm from "../form/category-form";
const CategoriesSettingsComponent = ({
  categories,
  restaurant,
  category,
}: IDashboardProps) => {
  const {
    isSubmitLoading,
    isConfirmDialogOpen,
    currentCategories,
    imageUrl,
    localImageUrl,
    openModal,
    btnOpen,
    activeBtn,
    dialogErrorOpen,
    emptyErrorMessage,
    newCategory,
    setNewCategory,
    setIsConfirmDialogOpen,
    handleInputChange,
    handleImageChange,
    addCategory,
    deleteCategory,
    alertDialogErrorFunction,
    resetNewCategory,
    setEmptyErrorMessage,
    setDialogErrorOpen,
    setImageUrl,
    setActiveBtn,
    setOpenModal,
    setBtnOpen,
    setLocalImageUrl,
  } = useCategoriesForm({ categories, restaurant, category });
  return (
    <>
      <div className="flex w-full   flex-wrap items-center justify-center gap-2 overflow-y-auto bg-[#E5E5E5] lg:flex lg:flex-col px-3">
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
                Adicionar Categoria
              </Button>
            </div>
          </div>
          <Table className=" mb-3 ">
            <TableHeader>
              <TableRow>
                <TableHead>Foto da categoria</TableHead>
                <TableHead>Nome do categoria</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="w-full">
              {currentCategories.map((category) => (
                <TableRow
                  key={category.id}
                  className="my-2 rounded-sm bg-[#ffffff] "
                >
                  <TableCell>
                    <div className="relative h-[60px] w-[60px]">
                      <Image
                        src={category.imageUrl}
                        alt={category.name}
                        fill
                        className="rounded-sm object-contain"
                        sizes="(max-width: 60px) 100vw, (max-width: 120px) 50vw, 33vw"
                      />
                    </div>
                  </TableCell>
                  <TableCell>{category.name}</TableCell>
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
                  <AlertDialagDeleteCategory
                    isConfirmDialogOpen={isConfirmDialogOpen}
                    setIsConfirmDialogOpen={() => setIsConfirmDialogOpen(false)}
                    isSubmitLoading={isSubmitLoading}
                    deleteCategory={async () => deleteCategory(category.id)}
                    category={category}
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
          {currentCategories.map((category) => (
            <CategorytEditItemCard
              key={category.id}
              category={category}
              restaurant={restaurant}
              deleteCategory={() => deleteCategory(category.id)}
            />
          ))}
        </div>
        <CategoryForm
          restaurantId={restaurant.id}
          newCategory={newCategory}
          setNewCategory={setNewCategory}
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
            resetNewCategory();
          }}
          handleInputChange={handleInputChange}
          handleImageChange={handleImageChange}
          localImageUrl={localImageUrl}
          addCategory={() => addCategory(restaurant.id)}
          isSubmitLoading={isSubmitLoading}
          openModal={openModal}
        />
      </div>
    </>
  );
};

export default CategoriesSettingsComponent;
