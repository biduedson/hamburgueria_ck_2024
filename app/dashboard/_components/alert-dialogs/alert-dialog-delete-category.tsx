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
import { Prisma } from "@prisma/client";
import { Loader2 } from "lucide-react";

interface AlertDialogProductProps {
  category: Prisma.CategoryGetPayload<{}>;
  isConfirmDialogOpen: boolean;
  isSubmitLoading: boolean;
  setIsConfirmDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
  deleteCategory: (id: string) => Promise<any>;
  emptyErrorMessage: string;
}
const AlertDialagDeleteCategory = ({
  isConfirmDialogOpen,
  setIsConfirmDialogOpen,
  isSubmitLoading,
  deleteCategory,
  category,
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
            <AlertDialogTitle>Deseja deletar esta categoria</AlertDialogTitle>
            <AlertDialogDescription>
              Ao finalizar, a categoria e todos os seus produtos serão
              deletados.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setIsConfirmDialogOpen(false)}>
              Cancelar
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                deleteCategory(category.id);
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

export default AlertDialagDeleteCategory;
