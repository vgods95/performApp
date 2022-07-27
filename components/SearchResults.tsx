import { ProductItem } from "./ProductItem";
import { useMemo } from 'react';
import { List, ListRowRenderer } from 'react-virtualized';

interface SearchResultsProps {
    results: Array<{
        id: number;
        price: number;
        title: string;
    }>
    onAddToWishList: (id: number) => void;
}

export function SearchResults({ results, onAddToWishList }: SearchResultsProps) {
    var values = 0;

    const sumValues = () => {
        if (results) {
            results.reduce((total, product) => {
                values = total + product.price
                return values;
            }, 0)
        }
    }

    useMemo(sumValues, [results]); //A função sumValues só será recalculada quando a dependência results for alterada

    const rowRenderer: ListRowRenderer = ({ index, key, style }) => {
        return (
            <div key={key} style={style}>
                <ProductItem product={results[index]} onAddToWishList={onAddToWishList} />
            </div>
        );
    }

    return (
        <div>
            <h2>{values}</h2>

            <List height={300} rowHeight={30} width={900}
                overscanRowCount={5} rowCount={results.length} rowRenderer={rowRenderer}
            />

            {/* {results.map(product => {
                return (
                    <ProductItem key={product.id} product={product} onAddToWishList={onAddToWishList} />
                );
            })} */}
        </div>
    );
}

/**
 * useMemo: Evitar que algo que tenha muito processamento. Por exemplo, um cálculo
 * Seja feito toda vez que o componente renderizar.
 * Será utilizado em duas situações:
 * 1. Cálculos pesados (se for simples talvez fique mais lento que antes, rs)
 * 2. Pra igualdade Referencial (quando a gente repassa aquela informação a um componente filho)
 * 
 * useCallback: é parecido com o useMemo mas é pra quando queremos armazenar uma função
 * e não um valor. É útil pois quando um componente é re-renderizado todas as funções
 * que ele tem dentro dele são recriadas e recolocadas em um lugar na memória. O que perde a igualdade referencial.
 * Não é pela quantidade de código dentro da função. É pela igualdade referencial mesmo.
 * Funções usadas em contextos, ou que são passadas de pais pra filho devem ser usadas com o useCallback
 * 
 * 
 */