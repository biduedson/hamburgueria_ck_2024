import { OrderStatus } from "@prisma/client";
import { useState } from "react";


interface IOrderUpdateStatusProps{
    status:OrderStatus
}



const useOrderForm = ({status}:IOrderUpdateStatusProps) =>{
    const [openModal, setOpenModal] = useState<boolean>(false);

    
   
   
   
    return{
        openModal,
        setOpenModal
    }
}


export default useOrderForm
