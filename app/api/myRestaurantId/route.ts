import { authOptions } from "@/app/_lib/auth";
import { db } from "@/app/_lib/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";


export async function GET(){
    const data = await getServerSession(authOptions);

    if(!data){
        return NextResponse.json({message: "Usuário não autenticado." }, {status: 401})
    }
    const [restaurant] = await db.restaurant.findMany({
        where: {
          ownerId: data.user.id,
        },
        
        
      });

      
     return NextResponse.json(restaurant)
}