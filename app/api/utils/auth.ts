import { getServerSession } from "next-auth";
import { IAuth, IAuthResponse } from "../interface/auth/auth";
import { authOptions } from "@/app/_lib/auth";




class AuthUserSession implements IAuth{

    async logged():Promise<IAuthResponse>{
        const session = await getServerSession(authOptions);

        if(!session){
            return{
                logged:false,
            }
           
        }

        return {
            logged:true,
            session:session
        }
    }
    
    
}

export const authUserSession = new AuthUserSession()

