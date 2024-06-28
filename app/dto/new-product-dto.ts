import Decimal from "decimal.js";

interface INewProduct {
  name: string;
  description: string;
  imageUrl: string;
  price: Decimal;
  discountPercentage: number;
  restaurantId: string;
  categoryId: string;
}

interface IResponse {
  messageError?: string;
  emptyError: boolean;
}
export const newProductEmpty = (newProduct: INewProduct): IResponse => {
  for (const key in newProduct) {
    if (newProduct.hasOwnProperty(key)) {
      // Ignorar o campo imageUrl
      if (key === 'imageUrl') {
        continue;
      }

      const value = newProduct[key as keyof INewProduct];

      if (value === null || value === undefined || value === '' || Number.isNaN(value)) {
        return {
          messageError: `O campo ${key} é obrigatório.`,
          emptyError: true
        };
      }

      if (key === 'price' && value instanceof Decimal && value.equals(0)) {
        return {
          messageError: `O campo ${key} não pode ser zero nem estar vazio.`,
          emptyError: true
        };
      }
    }
  }

  return {
    messageError: "",
    emptyError: false
  };
};