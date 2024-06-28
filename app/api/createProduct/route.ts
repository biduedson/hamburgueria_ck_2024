import { authOptions } from "@/app/_lib/auth";
import { db } from "@/app/_lib/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { createProductController } from "../controller/product/create-product-controller";


export async function POST(req:Request){
  const data = await req.json();
  const {body, statusCode} = await createProductController.handle({body: data!})

  return NextResponse.json( body , {status: statusCode})

    const session = await getServerSession(authOptions);

    if(!session){
        return NextResponse.json({message: "Usuário não autenticado." }, {status: 401})
    }
    

    const idRestaurant = await db.restaurant.findFirst({ 
      });

    if(!idRestaurant){
        return NextResponse.json({message: "Restaurante não cadastrado." }, {status: 401})
    }

      if(idRestaurant.ownerId !== session.user.id){
        return NextResponse.json({message: "Não autorizado." }, {status: 401})
    }
    
      if(!req.body){
        return NextResponse.json({message: "Dados não informados." }, {status: 400})
    }
    
    //const data = await req.json();
    
    
        const newProduct =   await db.product.create({
            data: {
                name: data.name,
                description: data.description,
                imageUrl: data.imageUrl,
                price: data.price,
                discountPercentage: data.discountPercentage,
                restaurantId:data.restaurantId,
                categoryId: data.categoryId,
            },
            include: {
                category: true,
                restaurant: true,
              }, 
          });
          console.log(newProduct)
          return NextResponse.json(newProduct, { status: 201 });
       
    }
   
      
     
