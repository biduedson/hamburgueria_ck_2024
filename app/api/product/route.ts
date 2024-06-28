import { authOptions } from "@/app/_lib/auth";
import { db } from "@/app/_lib/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";


export async function  DELETE(req: Request): Promise<Response> {
    try {

        const {searchParams} = new URL(req.url)
        const idProduct = searchParams.get('id')?.toString()
        const session = await getServerSession(authOptions);

    
    if(req.method !== "DELETE"){
      return NextResponse.json({message: "Metodo incorreto" }, { status: 401})  
    }

    //const {id} = req.body;

    if(!idProduct){
        return NextResponse.json({message: "Id não informado" }, { status: 401})
    }

    if(!session || !session.user){
        return NextResponse.json({message: "Usuário não autenticado" }, { status: 401})
    }


    const restaurant = await db.restaurant.findFirst({})

    if(!restaurant){
        return NextResponse.json({message: "Não autorizado" } , { status: 401} )
    }

    if(!restaurant || restaurant.ownerId !== session.user.id){
        return NextResponse.json({message: "Não autorizado" } , { status: 401})
    }
       
   
    
    const idUser = session.user.id;

    if(!idUser){
        return NextResponse.json({message:"Não autorizado."} , { status: 401 })
    }

    if(!restaurant){
        return NextResponse.json({message:"Não autorizado."} , { status: 401 })
        
    }
    
   
    
    console.log("Usuário autorizado, tentando deletar produto...");
    try {

        const favoritProduct = await db.userFavoriteProducts.findFirst({
            where:{
                productId: idProduct
            }
        })

        if(favoritProduct){
            await db.userFavoriteProducts.deleteMany({
                where: {
                  productId: idProduct,
                },
              });
        }
       
       await db.product.delete({
        where: {
            id: idProduct,
        },
    });
    } catch (error) {
      console.log(error);
    }
   
  console.log("Produto deletado:");
      return NextResponse.json({ message: "Produto deletado com sucesso." } , { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: "Erro interno do servidor." });
    }
}

 

