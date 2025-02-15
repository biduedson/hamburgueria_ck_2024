"use client";

import { Avatar, AvatarImage } from "@/app/_components/ui/avatar";
import { Button } from "@/app/_components/ui/button";
import { Card, CardContent } from "@/app/_components/ui/card";
import { Separator } from "@/app/_components/ui/separator";
import { CartContext } from "@/app/_context/cart";
import { formatCurrency } from "@/app/_helpers/price";
import { Prisma, OrderStatus } from "@prisma/client";
import { ChevronRightIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useContext } from "react";

interface OrderItemProps {
  order: Prisma.OrderGetPayload<{
    include: {
      Restaurant: true;
      products: {
        include: {
          product: true;
        };
      };
    };
  }>;
}

const getOrdersStausLabel = (status: OrderStatus) => {
  switch (status) {
    case "CANCELED":
      return "Cancelado";
    case "COMPLETED":
      return "Finalizado";
    case "CONFIRMED":
      return "Confirmado";
    case "DELIVERING":
      return "Em transporte";
    case "PREPARING":
      return "Preparando";
  }
};
const OrderItem = ({ order }: OrderItemProps) => {
  const { addProductToCArt } = useContext(CartContext);

  const router = useRouter();

  const handleRedoOrderClick = () => {
    for (const orderProduct of order.products) {
      addProductToCArt({
        product: {
          ...orderProduct.product,
          Restaurant: order.Restaurant,
          quantity: orderProduct.quantity,
        },
      });
    }

    router.push(`/restaurants/${order.restaurantId}`);
  };

  return (
    <Card>
      <CardContent className="p-5">
        <div
          className={`w-fit rounded-full bg-[#EEEEEE] px-2 py-1 text-muted-foreground ${order.status !== "COMPLETED" && "bg-green-500 text-white"}`}
        >
          <span className="block text-xs font-semibold">
            {getOrdersStausLabel(order.status)}
          </span>
        </div>
        <div className="flex items-center justify-between pt-3">
          <div className="flex items-center gap-2">
            <Avatar className="h-6 w-6">
              <AvatarImage src={order.Restaurant?.imageUrl} />
            </Avatar>

            <span className="text-sm font-semibold">
              {order.Restaurant?.name}
            </span>
          </div>

          <Button
            variant="link"
            size="icon"
            className="h-5 w-5 text-black"
            asChild
          >
            <Link href="/">
              <ChevronRightIcon />
            </Link>
          </Button>
        </div>
        <div className="py-3">
          <Separator />
        </div>

        <div className="space-y-2">
          {order.products.map((product) => (
            <div key={product.id} className="flex items-center gap-2">
              <div className="flex h-5 w-5 justify-center rounded-full bg-muted-foreground">
                <span className="block text-xs text-white">
                  {product.quantity}
                </span>
              </div>
              <span className="block text-xs text-muted-foreground">
                {product.product.name}
              </span>
            </div>
          ))}
        </div>

        <div className="py-3">
          <Separator />
        </div>
        <div className=" flex items-center justify-between">
          <p className="text-sm">{formatCurrency(Number(order.totalPrice))}</p>
          <Button
            variant="link"
            className="text-xs text-primary"
            size="sm"
            disabled={order.status !== "COMPLETED"}
            onClick={handleRedoOrderClick}
          >
            Refazer pedido
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default OrderItem;
