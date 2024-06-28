import { Button } from "@/app/_components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/app/_components/ui/table";
import { formatCurrency } from "@/app/_helpers/price";
import { Prisma } from "@prisma/client";
import { TrashIcon, EditIcon } from "lucide-react";
import Image from "next/image";

interface ProductTableProps {
  currentProducts: Prisma.ProductGetPayload<{
    include: {
      category: true;
      restaurant: true;
    };
  }>[];

  setIsConfirmDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const ProductTable = ({
  currentProducts,
  setIsConfirmDialogOpen,
}: ProductTableProps) => {
  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nome</TableHead>
            <TableHead>Descrição</TableHead>
            <TableHead>Imagem</TableHead>
            <TableHead>Preço</TableHead>
            <TableHead>Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="w-full">
          {currentProducts.map((product) => (
            <TableRow
              key={product.id}
              className="my-2 rounded-sm bg-[#ffffff] "
            >
              <TableCell>
                <div className="relative h-[60px] w-[60px]">
                  <Image
                    src={product.imageUrl}
                    alt={product.name}
                    fill
                    className="rounded-sm object-cover"
                    sizes="(max-width: 60px) 100vw, (max-width: 120px) 50vw, 33vw"
                  />
                </div>
              </TableCell>
              <TableCell>{product.name}</TableCell>
              <TableCell>{formatCurrency(Number(product.price))}</TableCell>
              <TableCell>{product.discountPercentage}%</TableCell>
              <TableCell>
                {product.description.length > 10
                  ? product.description.substring(0, 10)
                  : product.description}
                ...
              </TableCell>
              <TableCell>{product.category.name}</TableCell>
              <TableCell className="flex gap-2">
                <div className="flex cursor-pointer flex-col items-center">
                  <EditIcon width={20} height={20} />
                  <span className="tex text-sm font-semibold text-yellow-500">
                    Editar
                  </span>
                </div>
                <div
                  className="flex cursor-pointer flex-col items-center"
                  onClick={() => {
                    setIsConfirmDialogOpen(true);
                  }}
                >
                  <TrashIcon width={20} height={20} />
                  <span className="tex text-sm font-semibold text-red-600">
                    Deletar
                  </span>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};

export default ProductTable;
