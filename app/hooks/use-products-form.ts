import { useState,ChangeEvent } from "react";
import { ICrudProductListProps, NewProduct, } from "../dashboard/types/products-interface";
import { Decimal } from "decimal.js";
import { newProductEmpty } from "../dto/new-product-dto";
import { NextResponse } from "next/server";


const useProductForm = ({products,category,restaurant}: ICrudProductListProps) =>{
const [isSubmitLoading, setIsSubmiLoading] = useState(false);
const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
const [currentProducts, setCurrentProducts] = useState(products);
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
};

const handleInputChange = (
  event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
) => {
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
  console.log(newProductEmpty(newProduct));
  //console.log(productEmpty);
  console.log(newProduct);
};

const handlePriceChange = (event: ChangeEvent<HTMLInputElement>) => {
  let value = event.target.value;

  // Remove todos os caracteres que não são dígitos
  value = value.replace(/\D+/g, "");

  // Remove zeros à esquerda
  value = value.replace(/^0+/, "");

  // Adiciona zeros à esquerda se necessário
  while (value.length < 3) {
    value = "0" + value;
  }

  // Adiciona o separador decimal
  value =
    value.slice(0, value.length - 2) + "," + value.slice(value.length - 2);

  // Remove qualquer separador de milhar existente
  value = value.replace(/\B(?=(\d{3})+(?!\d))/g, "");

  // Adiciona separadores de milhar novamente
  value = value.replace(/\B(?=(\d{3})+(?!\d))/g, ".");

  setPrice(value);

  const numericValue = parseFloat(value.replace(/\./g, "").replace(",", "."));

  if (!isNaN(numericValue)) {
    setNewProduct((prevProduct) => ({
      ...prevProduct,
      price: new Decimal(numericValue),
    }));
  }

  console.log(newProductEmpty(newProduct));
  const productEmpty = newProductEmpty(newProduct);

  if (productEmpty.emptyError === false && imageUrl) {
    btnAddTrue(true, false);
  }
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
    imageUrl,
    localImageUrl,
    openModal,
    btnOpen,
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
  };
}
export default useProductForm;
