import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/app/_components/ui/alert-dialog";
import { Loader2 } from "lucide-react";
import React from "react";

interface AlertDialogErrorProps {
  dialogErrorOpen: boolean;
  setDialogErrorOpen: React.Dispatch<React.SetStateAction<boolean>>;
  emptyErrorMessage: string;
  alertDialogActionError: () => void;
  isSubmitLoading: boolean;
}

const AlertDialogError = ({
  dialogErrorOpen,
  setDialogErrorOpen,
  emptyErrorMessage,
  alertDialogActionError,
  isSubmitLoading,
}: AlertDialogErrorProps) => {
  return (
    <>
      <AlertDialog open={dialogErrorOpen} onOpenChange={setDialogErrorOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{emptyErrorMessage}</AlertDialogTitle>
            <AlertDialogDescription>
              Ao finalizar pode ser feito o cadastro novamente..
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction
              onClick={alertDialogActionError}
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

export default AlertDialogError;
