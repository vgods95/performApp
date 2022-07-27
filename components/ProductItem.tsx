import { memo, useState, lazy, Suspense } from 'react';
import lodash from 'lodash';

const AddProductToWishlist = lazy(() => {
    return import('./AddProductToWishlist');
});

interface ProductItemProps {
    product: {
        id: number;
        price: number;
        title: string;
    }
    onAddToWishList: (id: number) => void;
}

function ProductItemComponenet({ product, onAddToWishList }: ProductItemProps) {
    const [isAddingToWishlist, setIsAddingToWishlist] = useState(false);

    return (
        <div>
            {product.title} - <strong>{product.price}</strong>
            <button onClick={() => setIsAddingToWishlist(true)}>Adicionar aos favoritos</button>

            {
                //Vai exibir a mensagem carregando enquanto aguarda o lazy loading do Componente AddProductToWishlist
                isAddingToWishlist &&
                <Suspense fallback={<span>Carregando...</span>}>
                    <AddProductToWishlist
                        onAddToWishlist={() => onAddToWishList(product.id)}
                        onRequestClose={() => setIsAddingToWishlist(false)}
                    />
                </Suspense>
            }
        </div>
    )
}

export const ProductItem = memo(ProductItemComponenet, (prevProps, nextProps) => {
    //sreturn Object.is(prevProps.product, nextProps.product)
    return lodash.isEqual(prevProps.product, nextProps.product)
})

/**
 * O memo evita que o componente seja renderizado novamente se a comparação feita na função
 * não for satisfeita. Ou seja, se o objeto produto for igual, o componente não será renderizado
 * novamente.
 * 
 * Ele pode ser utilizado em qual situação?
 * 1. Componentes Puros - Componentes que só são interface [[sempre retornam o mesmo resultado independente
 * dos parâmetros de entrada]]
 * 2. Componentes que renderizam demais
 * 3. Quando o componente renderiza diversas vezes com as mesmas props
 * 4. Componentes médios ou grandes [[componentes muito pequenos como ProductItem o custo da re-render é
 * o mesmo da comparação do memo, ou seja, não haverá ganhos]]
 */