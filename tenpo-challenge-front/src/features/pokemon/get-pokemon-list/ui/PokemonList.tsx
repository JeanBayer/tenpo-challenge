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
      estimateSize={114}
      overscan={6}
      className="h-[500px] w-full"
      rowClassName="max-w-3xs bg-white"
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
