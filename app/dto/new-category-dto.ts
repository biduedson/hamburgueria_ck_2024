import { IResponse } from "../dashboard/types/types-dashoboard";

interface INewCategory {
    name: string;
    imageUrl: string;
    restaurantId: string;
   
  }

  export const newCategoryEmpty = ( newCategory: INewCategory): IResponse => {
    for (const key in  newCategory) {
      if ( newCategory.hasOwnProperty(key)) {
        // Ignorar o campo imageUrl
        if (key === 'imageUrl') {
          continue;
        }
  
        const value = newCategory[key as keyof INewCategory];
  
        if (value === null || value === undefined || value === '' || Number.isNaN(value)) {
          return {
            messageError: `O campo ${key} é obrigatório.`,
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