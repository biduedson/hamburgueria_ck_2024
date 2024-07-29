import { NextResponse } from "next/server"
import { getCategoriesController } from "../controller/category/get-categories-controller"


export async function GET(){
    const{body, statusCode} = await getCategoriesController.handle()
    return NextResponse.json(body, {status: statusCode})
}