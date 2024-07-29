import { INewProduct } from "@/app/dashboard/types/types-dashoboard";
import { newProductEmpty } from "@/app/dto/new-product-dto";
import React, { ChangeEvent } from "react";


interface IHandleInputChangeProps{
    setNewProduct:React.Dispatch<React.SetStateAction<INewProduct>>;
    setEmptyErrorMessage:React.Dispatch<React.SetStateAction<string>>;
    newProduct: INewProduct;
    imageUrl: File | null;
    btnAddTrue: (imagUrl: boolean, emptyError: boolean) => void;
}

export const handleInputChangeCreateProduct = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement> ,
    {
    setNewProduct,
    setEmptyErrorMessage,
    newProduct,
    imageUrl,
    btnAddTrue,
  }: IHandleInputChangeProps) => {
    const { id, value } = event.target;
    setNewProduct((prevProduct) => ({
      ...prevProduct,
      [id]: id === "discountPercentage" ? parseInt(value) : value,
    }));
    setEmptyErrorMessage("");
    const productEmpty = newProductEmpty(newProduct);
  
    if (productEmpty.emptyError === false && imageUrl) {
      btnAddTrue(true, false);
    }
    
    console.log(newProduct);
  };