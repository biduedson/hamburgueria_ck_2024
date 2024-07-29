import { updateProductController } from "../../controller/product/update-product-controller"
import { NextResponse } from "next/server"


export async function UPDATE(req:Request){
const data = await  req.json()

const {body, statusCode} = await updateProductController.handle({body: data})
return NextResponse.json(body, {status: statusCode})
}