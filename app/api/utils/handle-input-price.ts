import { ChangeEvent } from "react";
import { Decimal } from "decimal.js";
import { INewProduct } from "../../core/model/newUser";
import { newProductEmpty } from "../../dto/new-product-dto";

type Operation ='POST' | 'UPDATE'

interface IHandleInputPriceProps{
    setPrice:React.Dispatch<React.SetStateAction<string>>;
    setNewProduct:React.Dispatch<React.SetStateAction<INewProduct>>;
    newProduct: INewProduct;
    imageUrl: File | null;
    btnAddTrue: (imagUrl: boolean, emptyError: boolean) => void;
    typeOperation: Operation
}

export const handleInputPriceChange = ( event: ChangeEvent<HTMLInputElement>,
    {setPrice,
     newProduct,
     setNewProduct,
     imageUrl,
     btnAddTrue,
     typeOperation}:IHandleInputPriceProps) => {
    
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

    if(typeOperation === 'POST'){
        console.log(newProductEmpty(newProduct));
        const productEmpty = newProductEmpty(newProduct);
      
        if (productEmpty.emptyError === false && imageUrl) {
          btnAddTrue(true, false);
        }
    }
   if(typeOperation === 'UPDATE'){
    btnAddTrue(true, false);
   }
    
  };