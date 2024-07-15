import { ChangeEvent, useState } from "react";
import { IDashboardProps, NewCategory } from "../dashboard/types/types-dashoboard";
import { NextResponse } from "next/server";
import { newCategoryEmpty } from "../dto/new-category-dto";



const useCategoriesForm = ({categories,restaurant,category}:IDashboardProps) =>{
const [currentCategories, setCurrentCategories] = useState(categories)
const [isSubmitLoading, setIsSubmiLoading] = useState(false);
const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
const [imageUrl, setImageUrl] = useState<File | null>(null);
const [localImageUrl, setLocalImageUrl] = useState<string>("");
const [openModal, setOpenModal] = useState(false);
const [btnOpen, setBtnOpen] = useState(false);
const [activeBtn, setActiveBtn] = useState({
  newCategoryDto: false,
  imageUrl: false,
});
const [dialogErrorOpen, setDialogErrorOpen] = useState(false);
const [emptyErrorMessage, setEmptyErrorMessage] = useState("");
const [newCategory, setNewCategory] = useState<NewCategory>({
  name: "",
  imageUrl: "",
  restaurantId: restaurant.id
});
const resetNewCategory = () => {
  setNewCategory({
  name: "",
  imageUrl: "",
  restaurantId: restaurant.id
  });
};

const handleInputChange = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const { id, value } = event.target;
    setNewCategory((prevCategory) => ({
      ...prevCategory,
      [id] : value,
    }));
    setEmptyErrorMessage("");
    const productEmpty = newCategoryEmpty(newCategory);
  
    if (productEmpty.emptyError === false && imageUrl) {
      btnAddTrue(true, false);
    }
    console.log(newCategoryEmpty(newCategory));
    //console.log(productEmpty);
    console.log(newCategory);
  };

const addCategory = async (restaurantId: string) => {
    const uploadedImage = await uploadImage(imageUrl);
  
    if (!uploadedImage) {
      setEmptyErrorMessage("Please upload an image");
      return console.log("Please upload an image");
    }
  
    setNewCategory((prevCategory) => ({
      ...prevCategory,
      restaurantId: String(restaurantId),
      imageUrl: uploadedImage, // Use the uploaded image URL here
    }));
    const emptyData = newCategoryEmpty(newCategory);
  
    if (emptyData.emptyError) {
      setEmptyErrorMessage(emptyData.messageError!);
      return console.log(emptyData.messageError!);
    }
    const newCategoryWithImageUrl = {
      ...newCategory,
      restaurantId: String(restaurantId),
      imageUrl: uploadedImage,
    };
  
    try {
      const response = await fetch(`/api/createCategory`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newCategoryWithImageUrl),
      });
      setIsSubmiLoading(true);
      setBtnOpen(false);
  
      const createdCategory = await response.json();
  
      if (response.status !== 201) {
        setEmptyErrorMessage(createdCategory || "Erro ao cadastrar Produto");
        setDialogErrorOpen(true);
        return console.log("Erro ao cadastrar categoria");
      }
  
      setCurrentCategories((prevCategories) => [...prevCategories, createdCategory]);
  
      setActiveBtn({
        newCategoryDto: false,
        imageUrl: false,
      });
      setEmptyErrorMessage("");
      resetNewCategory();
      setActiveBtn({
        newCategoryDto: false,
        imageUrl: false,
      });
      setLocalImageUrl("");
      
      btnAddTrue(false, false);
      console.log("Produto cadastrado com sucesso");
    } catch (error) {
      return console.log("Erro interno do servidor");
    } finally {
      setIsSubmiLoading(false);
      setActiveBtn({
        newCategoryDto: false,
        imageUrl: false,
      });
    }
  };

  const deleteCategory = async (id: string) => {
    try {
      const data = await fetch(`/api/category/?id=${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(data);
      setIsSubmiLoading(true);
      setCurrentCategories(
        currentCategories.filter((category) => category.id !== id)
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
  
      setNewCategory((prevCategory) => {
        const updatedCategory= {
          ...prevCategory,
          imageUrl: uploadedImageUrl,
        };
  
        const emptyData = newCategoryEmpty(updatedCategory);
  
        // Atualize o botão apenas após atualizar o produto
        btnAddTrue(true, emptyData.emptyError ? true : false);
  
        return updatedCategory
      });
  
      return uploadedImageUrl;
    } catch (error) {
      console.error(error);
    }
  };
  const handleImageChange = async (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const selectedFile = event.target.files[0];
      if (selectedFile) {
        setImageUrl(selectedFile);
        setLocalImageUrl(URL.createObjectURL(selectedFile));
        setBtnOpen(true);
        const emptyData = newCategoryEmpty(newCategory);
  
        btnAddTrue(
          selectedFile ? true : false,
          emptyData.emptyError ? true : false
        );
      }
    }
  };
  const btnAddTrue = (imagUrl: boolean, emptyError: boolean) => {
    if (imagUrl && emptyError === false) {
      setActiveBtn({
        newCategoryDto: true,
        imageUrl: true,
      });
    }
  };
  const alertDialogErrorFunction = () => {
    setDialogErrorOpen(() => !dialogErrorOpen);
    setEmptyErrorMessage("");
    setImageUrl(null);
    setActiveBtn((prevActiveBtn) => ({
      ...prevActiveBtn,
      newCategoryDto: false,
      imageUrl: false,
    }));
    setBtnOpen(false);
    resetNewCategory();
    setLocalImageUrl("");
  };
return {
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
  };
}

export default useCategoriesForm;