import { NextResponse } from "next/server";
import { getCategoryWhitController } from "../controller/category/get-category-whit-products-controller";


export async function GET(){
 
  const {body, statusCode} = await getCategoryWhitController.handle()
 return NextResponse.json( body , {status: statusCode})
    }
   
      
     
