/* eslint-disable no-unused-vars */
"use client";

import { ChangeEvent } from "react";
import { NewProduct } from "../../types/products-interface";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/app/_components/ui/dialog";
import { Button } from "@/app/_components/ui/button";
import { Textarea } from "@/app/_components/ui/textarea";
import { Loader2 } from "lucide-react";
import { Input } from "@/app/_components/ui/input";
import Image from "next/image";
import { Label } from "@/app/_components/ui/label";
import { NextResponse } from "next/server";

interface ActiveBtn {
  newProductDto: boolean;
  imageUrl: boolean;
}
interface ProductFormProps {
  restaurantId: string;
  categoryId: string;
  newProduct: NewProduct;
  imageUrl: File | null;
  activeBtn: ActiveBtn;
  emptyErrorMessage: string;
  handleCancelBtn: () => void;
  setNewProduct: React.Dispatch<React.SetStateAction<NewProduct>>;
  handleInputChange: (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  handlePriceChange: (event: ChangeEvent<HTMLInputElement>) => void;
  handleFocus: () => void;
  handleBlur: () => void;
  handleImageChange: (event: ChangeEvent<HTMLInputElement>) => void;
  localImageUrl: string;
  price: string;
  addProduct: (restaurantId: string, categoryId: string) => void;
  isSubmitLoading: boolean;
  openModal: boolean;
}
const ProductForm = ({
  restaurantId,
  categoryId,
  newProduct,
  setNewProduct,
  emptyErrorMessage,
  imageUrl,
  activeBtn,
  handleCancelBtn,
  handleInputChange,
  handlePriceChange,
  handleFocus,
  handleBlur,
  handleImageChange,
  localImageUrl,
  price,
  addProduct,
  isSubmitLoading,
  openModal,
}: ProductFormProps) => {
  return (
    <Dialog open={openModal} onOpenChange={() => openModal}>
      <DialogContent className="[&::-webkit-scrollbar]:hidden">
        <DialogHeader>
          <DialogTitle>Adicionar novo produto</DialogTitle>
          <DialogDescription>
            Por favor, preencha os dados do novo produto.
          </DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-2 gap-2">
          <div>
            <Label htmlFor="name">Nome</Label>
            <Input
              id="name"
              value={newProduct.name}
              onChange={handleInputChange}
              placeholder="Nome "
              className="w-full"
            />
          </div>

          <div>
            <Label htmlFor="price">Preço</Label>
            <Input
              id="price"
              value={price}
              onChange={handlePriceChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
              placeholder="Preço "
              className="w-full"
            />
          </div>
        </div>
        <div>
          <Label htmlFor="discountPercentage">Desconto</Label>
          <Input
            id="discountPercentage"
            type="number"
            value={newProduct.discountPercentage}
            onChange={handleInputChange}
            placeholder="Desconto"
          />
        </div>

        <div>
          <Label htmlFor="description">Descrição</Label>
          <Textarea
            id="description"
            value={newProduct.description}
            onChange={handleInputChange}
            placeholder="Descrição do produto"
          />
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
              alt="Product Image"
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
            disabled={!(activeBtn.imageUrl && activeBtn.newProductDto)}
            onClick={() => addProduct(restaurantId, categoryId)}
            className="w-full"
          >
            Cadastrar produto
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ProductForm;
