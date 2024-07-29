import { getServerSession } from "next-auth";
import { IAuth, IAuthResponse } from "../interface/auth/auth";
import { authOptions } from "@/app/_lib/auth";
import { db } from "@/app/_lib/prisma";





class AuthUserSession implements IAuth{
    
    async logged():Promise<IAuthResponse>{
        const session = await getServerSession(authOptions);
        const restaurant = await db.restaurant.findFirst({
            select:{
                ownerId:true
            }
        })

        if(!restaurant){
            return{
                logged:false,
            }
           
        }
        
        if(!session){
            return{
                logged:false,
            }
           
        }
        if(session.user.id !== restaurant.ownerId){
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

