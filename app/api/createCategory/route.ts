import { NextResponse } from "next/server";
import { createCategoryController } from "../controller/category/create-category-controller";

export async function POST(req:Request){
    const data = await req.json();
    
    const {body, statusCode} = await createCategoryController.handle({body: data!})
  
    return NextResponse.json( body , {status: statusCode})
       
      }