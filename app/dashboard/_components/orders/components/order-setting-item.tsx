"use client";

import { Button } from "@/app/_components/ui/button";
import { Card, CardContent } from "@/app/_components/ui/card";
import { CartContext } from "@/app/_context/cart";
import { formatCurrency } from "@/app/_helpers/price";
import { OrderStatus, Prisma } from "@prisma/client";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import { Separator } from "@radix-ui/react-separator";
import { ChevronRightIcon, EditIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation"; // quando for usando em components do lado cliente use o userouter do nextNavigation
import { useContext } from "react";

interface OrderSettingsItemProps {
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

const OrderSettingsItem = ({ order }: OrderSettingsItemProps) => {
  const router = useRouter();

  return (
    <Card>
      <CardContent className="p-5">
        <div className="flex cursor-pointer flex-col items-center">
          <EditIcon width={20} height={20} />
          <span className="tex text-[10px] font-semibold text-yellow-500">
            Alterar status do pedido
          </span>
        </div>
        <div
          className={`flex flex-col items-center w-fit rounded-full bg-[#EEEEEE] px-2 py-1 text-muted-foreground ${order.status !== "COMPLETED" && "bg-green-500 text-white"}`}
        >
          <p className=" text-[10px] font-light text-red-600 animate-pulse">
            Status
          </p>
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
          >
            Refazer pedido
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default OrderSettingsItem;
