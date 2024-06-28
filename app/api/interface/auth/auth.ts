import { Session } from "next-auth";


 export interface IAuthResponse{
    logged:boolean
    session?:Session
 }
 export interface IAuth{
    logged():Promise<IAuthResponse>
 }