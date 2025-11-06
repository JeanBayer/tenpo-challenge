import type { Pokemon } from "@entities/pokemon/model/types";
import { InfiniteVirtualizedList } from "@shared/ui/InfiniteVirtualizedList";
import { PokemonCard } from "./PokemonCard";

type PokemonListProps = {
  pokemonList: Pokemon[];
  hasMore?: boolean;
  isLoadingMore?: boolean;
  onLoadMore?: () => void;
};

export const PokemonList = ({
  pokemonList,
  hasMore = false,
  isLoadingMore = false,
  onLoadMore,
}: PokemonListProps) => {
  return (
    <InfiniteVirtualizedList
      count={pokemonList?.length}
      estimateSize={180}
      overscan={6}
      className="h-[60vh] w-full max-h-[610px] scroll-smooth px-2 sm:px-4"
      innerClassName="mx-auto w-full"
      rowClassName="flex w-full justify-center py-4"
      hasMore={hasMore}
      isLoadingMore={isLoadingMore}
      loadingIndicator="Loading more Pokémon..."
      onReachEnd={onLoadMore}
      getItemKey={(index) => pokemonList?.[index]?.id ?? index}
    >
      {(index) => {
        const pokemon = pokemonList?.[index];
        if (!pokemon) return null;
        return <PokemonCard pokemon={pokemon} />;
      }}
    </InfiniteVirtualizedList>
  );
};
