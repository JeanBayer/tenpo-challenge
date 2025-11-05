import type { Pokemon } from "@entities/pokemon/model/types";
import { VirtualizedList } from "@shared/ui/VirtualizedList";
import { PokemonCard } from "./PokemonCard";

type PokemonListProps = {
  pokemonList: Pokemon[];
};

export const PokemonList = ({ pokemonList }: PokemonListProps) => {
  return (
    <VirtualizedList
      count={pokemonList?.length}
      estimateSize={180}
      overscan={6}
      className="h-[60vh] w-full max-h-[610px] scroll-smooth px-2 sm:px-4"
      innerClassName="mx-auto w-full"
      rowClassName="flex w-full justify-center py-4"
      getItemKey={(index) => pokemonList?.[index]?.id ?? index}
    >
      {(index) => {
        const pokemon = pokemonList?.[index];
        if (!pokemon) return null;
        return <PokemonCard pokemon={pokemon} />;
      }}
    </VirtualizedList>
  );
};
