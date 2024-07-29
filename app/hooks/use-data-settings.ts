import { useState } from "react";
import { IDashboardProps, ICategory, NewCategory } from "../dashboard/types/types-dashoboard";

const useDataSettings = ({restaurant, category, categories, orders, orderStatus}: IDashboardProps) => {
    
    const [currentDataSettings, setCurrentDataSettings] = useState<IDashboardProps>({restaurant, category, categories, orders, orderStatus});
    const [currentCategories, setCurrentCategories] = useState<ICategory[]>(categories);

    const setCategories = (category: ICategory) => {
        console.log(category)
        setCurrentCategories((prevCategories) => [...(prevCategories || []), category]);
        setCurrentDataSettings((prevDataSettings) => ({
            ...prevDataSettings,
            categories: currentCategories
        }));
    };

    return {
        setCurrentDataSettings,
        currentDataSettings,
        setCategories
    };
};

export default useDataSettings;