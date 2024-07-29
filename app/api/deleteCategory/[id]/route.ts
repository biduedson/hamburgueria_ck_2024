import {  NextRequest, NextResponse } from "next/server"
import { deleteCategoryController } from "../../controller/category/delete-category-controller"


export async function DELETE(req:NextRequest):Promise<Response>{
    
   const params = req.url.toString()
   const id = params.toString().split("/")
    const {body,statusCode} = await deleteCategoryController.handle({params:id[5]})

    return NextResponse.json({message:body}, {status:statusCode})
}