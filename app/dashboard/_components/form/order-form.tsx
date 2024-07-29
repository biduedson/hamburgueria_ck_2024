"use client";
import { Button } from "@/app/_components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/app/_components/ui/dialog";
import { Label } from "@/app/_components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";

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

const orderStatus: string[] = [
  "CANCELED",
  "COMPLETED",
  "CONFIRMED",
  "DELIVERING",
  "PREPARING",
];

const OrderForm = () => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  return (
    <Dialog open={openModal} onOpenChange={() => openModal}>
      <DialogContent className="[&::-webkit-scrollbar]:hidden">
        <DialogHeader>
          <DialogTitle>Adicionar novo produto</DialogTitle>
          <DialogDescription>
            Por favor, preencha os dados do novo produto.
          </DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-1 gap-2">
          <div>
            <Label htmlFor="name">Nome</Label>
          </div>
        </div>

        <div className=" flex w-full flex-col items-center justify-between gap-1 ">
          {emptyErrorMessage && (
            <span className="text-xs font-semibold text-[red]">
              {emptyErrorMessage}
            </span>
          )}

          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Theme" />
            </SelectTrigger>
            <SelectContent>
              {orderStatus.map((status, index) => (
                <SelectItem key={index} value={status}>
                  {getOrdersStausLabel(status)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <DialogFooter className="flex  justify-between gap-2 lg:gap-0">
          <Button onClick={() => !openModal} className="w-full">
            Cancelar
          </Button>

          <Button type="submit" className="w-full">
            Cadastrar produto
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default OrderForm;
