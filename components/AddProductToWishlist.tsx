export interface AddProductToWishlistProps {
    onAddToWishlist: () => void;
    onRequestClose: () => void;
}
export default function AddProductToWishlist({ onAddToWishlist, onRequestClose }: AddProductToWishlistProps) {
    return (      
            <span>
                Deseja adicionar aos favoritos?
                <button onClick={onAddToWishlist}>Sim</button>
                <button onClick={onRequestClose}>Não</button>
            </span>
    )
}