"use client";
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

import { Prisma } from "@prisma/client";
import { EditIcon, Loader2, TrashIcon } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

interface ICategoryEditItemCardProps {
  category: Prisma.CategoryGetPayload<{}>;
  restaurant: Prisma.RestaurantGetPayload<{}>;
  deleteCategory: (id: string) => void;
}

const CategorytEditItemCard = ({
  category,
  restaurant,
  deleteCategory,
}: ICategoryEditItemCardProps) => {
  const [isSubmitLoading, setIsSubmiLoading] = useState(false);
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);

  return (
    <div className="w-[170px] space-y-2 py-2 ">
      <div className="relative aspect-square w-full lg:w-[135px] xl:w-[155px]  2xl:w-[180px]">
        {/* IMAGEN*/}
        <Image
          src={category.imageUrl}
          alt={category.name}
          fill
          className="rounded-lg object-cover shadow-md"
        />
      </div>

      {/* TITULO, PREÇO E RESTAURANTE*/}
      <div>
        <h2 className="truncate text-sm">{category.name}</h2>
        <div className="flex items-center gap-1"></div>

        <span className="block text-xs text-muted-foreground">
          {restaurant.name}
        </span>
      </div>
      <div className="flex w-full justify-between gap-2">
        <div className="flex cursor-pointer flex-col items-center">
          <EditIcon width={20} height={20} />
          <span className="tex text-sm font-semibold text-yellow-500">
            Editar
          </span>
        </div>
        <div
          className="flex cursor-pointer flex-col items-center"
          onClick={() => setIsConfirmDialogOpen(true)}
        >
          <TrashIcon width={20} height={20} />
          <span className="tex text-sm font-semibold text-red-600">
            Deletar
          </span>
        </div>
      </div>
      <AlertDialog
        open={isConfirmDialogOpen}
        onOpenChange={setIsConfirmDialogOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Deseja deletar este produto</AlertDialogTitle>
            <AlertDialogDescription>
              Ao finalizar o produto sera deletado.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setIsConfirmDialogOpen(false)}>
              Cancelar
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                setIsSubmiLoading(true);
                deleteCategory(category.id);
                setIsSubmiLoading(false);
              }}
              disabled={isSubmitLoading}
            >
              {isSubmitLoading && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              )}
              Finalizar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default CategorytEditItemCard;
