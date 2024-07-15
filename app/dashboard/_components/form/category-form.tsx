/* eslint-disable no-unused-vars */
"use client";

import { ChangeEvent } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/app/_components/ui/dialog";
import { Button } from "@/app/_components/ui/button";
import { Input } from "@/app/_components/ui/input";
import Image from "next/image";
import { Label } from "@/app/_components/ui/label";
import { NextResponse } from "next/server";
import { NewCategory } from "../../types/types-dashoboard";

interface ActiveBtn {
  newCategoryDto: boolean;
  imageUrl: boolean;
}
interface CategorytFormProps {
  restaurantId: string;

  newCategory: NewCategory;
  imageUrl: File | null;
  activeBtn: ActiveBtn;
  emptyErrorMessage: string;
  handleCancelBtn: () => void;
  setNewCategory: React.Dispatch<React.SetStateAction<NewCategory>>;
  handleInputChange: (event: ChangeEvent<HTMLInputElement>) => void;
  handleImageChange: (event: ChangeEvent<HTMLInputElement>) => void;
  localImageUrl: string;
  addCategory: (restaurantId: string) => void;
  isSubmitLoading: boolean;
  openModal: boolean;
}
const CategoryForm = ({
  restaurantId,
  newCategory,
  setNewCategory,
  emptyErrorMessage,
  imageUrl,
  activeBtn,
  handleCancelBtn,
  handleInputChange,
  handleImageChange,
  localImageUrl,
  addCategory,
  isSubmitLoading,
  openModal,
}: CategorytFormProps) => {
  return (
    <Dialog open={openModal} onOpenChange={() => openModal}>
      <DialogContent className="[&::-webkit-scrollbar]:hidden">
        <DialogHeader>
          <DialogTitle>Adicionar novo produto</DialogTitle>
          <DialogDescription>
            Por favor, preencha os dados do novo produto.
          </DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-1 gap-2">
          <div>
            <Label htmlFor="name">Nome</Label>
            <Input
              id="name"
              value={newCategory.name}
              onChange={handleInputChange}
              placeholder="Nome "
              className="w-full"
            />
          </div>
        </div>

        <div className=" flex w-full flex-col items-center justify-between gap-1 ">
          {emptyErrorMessage && (
            <span className="text-xs font-semibold text-[red]">
              {emptyErrorMessage}
            </span>
          )}

          <Input
            id="Imagem"
            type="file"
            className="w-full bg-customRed text-white"
            onChange={handleImageChange}
            accept=".jpg, .jpeg, .png"
          />
        </div>
        {localImageUrl && (
          <div
            className={`relative lg:h-[160px] ${imageUrl ? "h-[140px]" : "h-[0px]"} w-full`}
          >
            <Image
              src={localImageUrl}
              alt="Category Image"
              fill
              className="rounded-md object-contain "
            />
          </div>
        )}

        <DialogFooter className="flex  justify-between gap-2 lg:gap-0">
          <Button onClick={handleCancelBtn} className="w-full">
            Cancelar
          </Button>

          <Button
            type="submit"
            disabled={!(activeBtn.imageUrl && activeBtn.newCategoryDto)}
            onClick={() => addCategory(restaurantId)}
            className="w-full"
          >
            Cadastrar produto
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CategoryForm;
