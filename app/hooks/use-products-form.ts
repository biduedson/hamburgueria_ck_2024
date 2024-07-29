"use client"
import { useState,ChangeEvent } from "react";
import { Decimal } from "decimal.js";
import { newProductEmpty } from "../dto/new-product-dto";
import { NextResponse } from "next/server";
import { IDashboardProps } from "../dashboard/types/types-dashoboard";
import { handleInputChangeCreateProduct } from "../api/utils/handle-input-change";
import {handleInputPriceChange} from "../api/utils/handle-input-price";

interface NewProduct {
  name: string;
  description: string;
  imageUrl: string;
  price: Decimal;
  discountPercentage: number;
  restaurantId: string;
  categoryId: string;
}

const useProductForm = ({ restaurant, categories,category,}: IDashboardProps) =>{
  
const [isSubmitLoading, setIsSubmiLoading] = useState(false);
const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
const [currentCategories, setCurrentCategories] = useState(categories);

const [currentProducts, setCurrentProducts] = useState(category?.products);
const [imageUrl, setImageUrl] = useState<File | null>(null);
const [localImageUrl, setLocalImageUrl] = useState<string>("");
const [openModal, setOpenModal] = useState(false);
const [btnOpen, setBtnOpen] = useState(false);
const [activeBtn, setActiveBtn] = useState({
  newProductDto: false,
  imageUrl: false,
});
const [dialogErrorOpen, setDialogErrorOpen] = useState(false);

const [emptyErrorMessage, setEmptyErrorMessage] = useState("");
const [newProduct, setNewProduct] = useState<NewProduct>({
  name: "",
  description: "",
  imageUrl: "",
  price: new Decimal(0),
  discountPercentage: 0,
  restaurantId: restaurant.id,
  categoryId: category.id,
});
const [price, setPrice] = useState("0,00");
const resetNewProduct = (restaurantId: string, categoryId: string) => {
  setNewProduct({
    name: "",
    description: "",
    imageUrl: "",
    price: new Decimal(0),
    discountPercentage: 0,
    restaurantId: String(restaurantId),
    categoryId: String(categoryId),
  });
  setLocalImageUrl("")
};

const handleFocus = () => {
  if (price === "0,00") {
    setPrice("");
  }
};

const handleBlur = () => {
  if (price === "") {
    setPrice("0,00");
  }
};

const btnAddTrue = (imagUrl: boolean, emptyError: boolean) => {
  if (imagUrl && emptyError === false) {
    setActiveBtn({
      newProductDto: true,
      imageUrl: true,
    });
  }
};

const addProduct = async (restaurantId: string, categoryId: string) => {
  const uploadedImage = await uploadImage(imageUrl);

  if (!uploadedImage) {
    setEmptyErrorMessage("Please upload an image");
    return console.log("Please upload an image");
  }

  setNewProduct((prevProduct) => ({
    ...prevProduct,
    restaurantId: String(restaurantId),
    categoryId: String(categoryId),
    imageUrl: uploadedImage, // Use the uploaded image URL here
  }));
  const emptyData = newProductEmpty(newProduct);

  if (emptyData.emptyError) {
    setEmptyErrorMessage(emptyData.messageError!);
    return console.log(emptyData.messageError!);
  }
  const newProductWithImageUrl = {
    ...newProduct,
    restaurantId: String(restaurantId),
    categoryId: String(categoryId),
    imageUrl: uploadedImage,
  };

  try {
    const response = await fetch(`/api/createProduct`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newProductWithImageUrl),
    });
    setIsSubmiLoading(true);
    setBtnOpen(false);

    const createdProduct = await response.json();

    if (response.status !== 201) {
      setEmptyErrorMessage(createdProduct || "Erro ao cadastrar Produto");
      setDialogErrorOpen(true);
      return console.log("Erro ao cadastrar Produto");
    }

    setCurrentProducts((prevProducts) => [...prevProducts, createdProduct]);

    setActiveBtn({
      newProductDto: false,
      imageUrl: false,
    });
    setEmptyErrorMessage("");
    resetNewProduct(restaurantId, categoryId);
    setActiveBtn({
      newProductDto: false,
      imageUrl: false,
    });
    setLocalImageUrl("");
    setPrice("");
    btnAddTrue(false, false);
    console.log("Produto cadastrado com sucesso");
  } catch (error) {
    return console.log("Erro interno do servidor");
  } finally {
    setIsSubmiLoading(false);
    setActiveBtn({
      newProductDto: false,
      imageUrl: false,
    });
  }
};
// eslint-disable-next-line no-unused-vars
const alertDialogErrofunction = () => {
  setDialogErrorOpen(() => !dialogErrorOpen);
  setEmptyErrorMessage("");

  setImageUrl(null);
  setActiveBtn((prevActiveBtn) => ({
    ...prevActiveBtn,
    newProductDto: false,
    imageUrl: false,
  }));

  setBtnOpen(false);
  resetNewProduct(restaurant.id, category.id);
  setPrice("");
  setLocalImageUrl("");
};

const deleteProduct = async (id: string) => {
  console.log(id);
  try {
    const data = await fetch(`/api/product/?id=${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log(data);
    setIsSubmiLoading(true);
    setCurrentProducts(
      currentProducts.filter((product) => product.id !== id)
    );

    const response = await data.json();
    return response;
    console.log(response);
  } catch (error) {
    console.log("Erro interno do servidor: ", error);
  } finally {
    setIsSubmiLoading(false);
  }
};
const alertDialogErrorFunction = () => {
    setDialogErrorOpen(() => !dialogErrorOpen);
    setEmptyErrorMessage("");
    setImageUrl(null);
    setActiveBtn((prevActiveBtn) => ({
      ...prevActiveBtn,
      newProductDto: false,
      imageUrl: false,
    }));
    setBtnOpen(false);
    resetNewProduct(restaurant.id, category.id);
    setPrice("");
    setLocalImageUrl("");
  };
const handleImageChange = async (event: ChangeEvent<HTMLInputElement>) => {
  if (event.target.files && event.target.files[0]) {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setImageUrl(selectedFile);
      setLocalImageUrl(URL.createObjectURL(selectedFile));
      setBtnOpen(true);
      const emptyData = newProductEmpty(newProduct);

      btnAddTrue(
        selectedFile ? true : false,
        emptyData.emptyError ? true : false
      );
    }
  }
};
const updateProduct = async (restaurantId: string, categoryId: string, productId:string) => {
  const uploadedImage = await uploadImage(imageUrl);

  if (!uploadedImage) {
    setEmptyErrorMessage("Please upload an image");
    return console.log("Please upload an image");
  }

  setNewProduct((prevProduct) => ({
    ...prevProduct,
    restaurantId: String(restaurantId),
    categoryId: String(categoryId),
    imageUrl: uploadedImage, // Use the uploaded image URL here
  }));
  const emptyData = newProductEmpty(newProduct);

  if (emptyData.emptyError) {
    setEmptyErrorMessage(emptyData.messageError!);
    return console.log(emptyData.messageError!);
  }
  const newProductWithImageUrl = {
    ...newProduct,
    restaurantId: String(restaurantId),
    categoryId: String(categoryId),
    imageUrl: uploadedImage,
  };

  try {
    const response = await fetch(`/api/updateProduct/${productId}`, {
      method: "UPDATE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newProductWithImageUrl),
    });
    setIsSubmiLoading(true);
    setBtnOpen(false);

    const createdProduct = await response.json();

    if (response.status !== 201) {
      setEmptyErrorMessage(createdProduct || "Erro ao cadastrar Produto");
      setDialogErrorOpen(true);
      return console.log("Erro ao cadastrar Produto");
    }

    setCurrentProducts((prevProducts) => [...prevProducts, createdProduct]);

    setActiveBtn({
      newProductDto: false,
      imageUrl: false,
    });
    setEmptyErrorMessage("");
    resetNewProduct(restaurantId, categoryId);
    setActiveBtn({
      newProductDto: false,
      imageUrl: false,
    });
    setLocalImageUrl("");
    setPrice("");
    btnAddTrue(false, false);
    console.log("Produto cadastrado com sucesso");
  } catch (error) {
    return console.log("Erro interno do servidor");
  } finally {
    setIsSubmiLoading(false);
    setActiveBtn({
      newProductDto: false,
      imageUrl: false,
    });
  }
};

const uploadImage = async (imageUrl: File | null) => {
  if (!imageUrl) {
    setEmptyErrorMessage("Por favor carregue a imagem do produto.");
    return NextResponse.json("Por favor carregue a imagem do produto.");
  }

  const formData = new FormData();
  formData.append("image", imageUrl);

  try {
    const response = await fetch("/api/uploadImage", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error("Failed to upload image.");
    }

    const data = await response.json();
    const uploadedImageUrl = data.imageUrl;

    setImageUrl(uploadedImageUrl);

    setNewProduct((prevProduct) => {
      const updatedProduct = {
        ...prevProduct,
        imageUrl: uploadedImageUrl,
      };

      const emptyData = newProductEmpty(updatedProduct);

      // Atualize o botão apenas após atualizar o produto
      btnAddTrue(true, emptyData.emptyError ? true : false);

      return updatedProduct;
    });

    return uploadedImageUrl;
  } catch (error) {
    console.error(error);
  }
};
return {
    isSubmitLoading,
    isConfirmDialogOpen,
    currentProducts,
    currentCategories, 
    setCurrentCategories,
    imageUrl,
    localImageUrl,
    openModal,
    btnOpen,
    activeBtn,
    dialogErrorOpen,
    emptyErrorMessage,
    newProduct,
    setNewProduct,
    price,
    setIsConfirmDialogOpen,
    handlePriceChangeUpdate:(event: ChangeEvent<HTMLInputElement>) =>
      handleInputPriceChange(event,{
        setPrice,
        setNewProduct,
        newProduct,
        imageUrl,
        btnAddTrue,
        typeOperation:'UPDATE'
      }),
      handlePriceChangePost:(event: ChangeEvent<HTMLInputElement>) =>
        handleInputPriceChange(event,{
          setPrice,
          setNewProduct,
          newProduct,
          imageUrl,
          btnAddTrue,
          typeOperation:'POST'
        }),
    handleFocus,
    handleBlur,
    handleImageChange,
    addProduct,
    deleteProduct,
    updateProduct,
    alertDialogErrorFunction,
    resetNewProduct,
    setEmptyErrorMessage,
    setDialogErrorOpen,
    setImageUrl,
    setActiveBtn,
    setOpenModal,
    setBtnOpen,
    setPrice,
    setLocalImageUrl,
    handleInputChange:(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      handleInputChangeCreateProduct(event, {
        setNewProduct,
        setEmptyErrorMessage,
        newProduct,
        imageUrl,
        btnAddTrue,
      }),
  };
}
export default useProductForm;
