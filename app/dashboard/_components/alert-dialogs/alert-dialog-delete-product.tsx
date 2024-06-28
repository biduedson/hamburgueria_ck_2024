/* eslint-disable no-unused-vars */
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
import product from "@/app/api/entities/product";
import { Prisma } from "@prisma/client";
import { Loader2 } from "lucide-react";

interface AlertDialogProductProps {
  product: Prisma.ProductGetPayload<{}>;
  isConfirmDialogOpen: boolean;
  isSubmitLoading: boolean;
  setIsConfirmDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
  deleteProduct: (id: string) => Promise<any>;
  emptyErrorMessage: string;
}
const AlertDialagDeleteProduct = ({
  isConfirmDialogOpen,
  setIsConfirmDialogOpen,
  isSubmitLoading,
  deleteProduct,
  product,
  emptyErrorMessage,
}: AlertDialogProductProps) => {
  return (
    <>
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
                deleteProduct(product.id);
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
    </>
  );
};

export default AlertDialagDeleteProduct;
