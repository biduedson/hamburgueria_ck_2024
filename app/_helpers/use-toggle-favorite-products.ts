import { toast } from "sonner";
import { toggleFavoriteProduct} from "../_actions/restaurant";
import { useRouter } from "next/navigation";


interface IUseToggleFavoriteProductsProps{
    userId?: string;
    productId: string;
    productIsCurrentlyFavorite:boolean;
}

const UseToggleFavoriteProducts = ({
    userId,
    productId,
    productIsCurrentlyFavorite
}:IUseToggleFavoriteProductsProps) => {
    const router = useRouter()

    const handleFavoriteClick = async () => {
        if(!userId) return
    
        try {
          await toggleFavoriteProduct(userId, productId);
    
          toast(
          productIsCurrentlyFavorite
           ? "Produto removido dos seus favoritos."
           : "Produto adicionado aos seus favoritos.",
            {
              action: {
                label: "Ver Favoritos",
                onClick: () => router.push("/my-favorite-restaurants"),
              },
            },
          );
        } catch (error) {
          toast.error("Erro ao favoritar produto.");
        }
      };
    
      return { handleFavoriteClick };
    };
    
export default UseToggleFavoriteProducts;