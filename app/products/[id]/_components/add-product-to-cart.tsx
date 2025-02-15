/* eslint-disable no-unused-vars */
"use client";

import Cart from "@/app/_components/cart";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/app/_components/ui/alert-dialog";
import { Button } from "@/app/_components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/app/_components/ui/sheet";
import { CartContext } from "@/app/_context/cart";
import { Prisma } from "@prisma/client";
import { signIn, useSession } from "next-auth/react";
import { useContext, useState } from "react";

interface AddProductToCartProps {
  product: Prisma.ProductGetPayload<{
    include: {
      Restaurant: true;
    };
  }>;
  quantity: number;
}

const AddProductToCart = ({ product, quantity }: AddProductToCartProps) => {
  const { data } = useSession();
  const [isCArtOpen, setIsCartOpen] = useState(false);
  const [isConfirmationDialogOpen, setIsConfirmationDialogOpen] =
    useState(false);

  const { addProductToCArt, products } = useContext(CartContext);

  const addToCart = ({ emptyCart }: { emptyCart?: boolean }) => {
    addProductToCArt({ product: { ...product, quantity }, emptyCart });
    setIsCartOpen(true);
  };

  const handleAddToCartClick = () => {
    const hasDifferentRestaurantProduct = products.some(
      (cartProduct) => cartProduct.restaurantId !== product.restaurantId
    );

    addToCart({
      emptyCart: false,
    });
  };

  return (
    <>
      <Sheet open={isCArtOpen} onOpenChange={setIsCartOpen}>
        <SheetContent className="w-[90vw]">
          <SheetHeader>
            <SheetTitle className="text-left">Sacola</SheetTitle>
          </SheetHeader>
          <Cart setIsOpen={setIsCartOpen} />
        </SheetContent>
      </Sheet>

      <AlertDialog
        open={isConfirmationDialogOpen}
        onOpenChange={setIsConfirmationDialogOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Você só pode adicionar itens de um restaurante por vez
            </AlertDialogTitle>
            <AlertDialogDescription>
              Deseja mesmo adicionar este produto de outro restaurante? Isso
              limpará sua sacola atual.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={() => addToCart({ emptyCart: true })}>
              Esvaziar sacola e adicionar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <div className="lg:px0 mt-6 w-full px-5">
        {data?.user ? (
          <Button
            className="w-full font-semibold"
            onClick={handleAddToCartClick}
          >
            Adicionar a sacola
          </Button>
        ) : (
          <Button className="w-full font-semibold" onClick={() => signIn()}>
            Faça login para adicionar produtos.
          </Button>
        )}
      </div>
    </>
  );
};

export default AddProductToCart;
