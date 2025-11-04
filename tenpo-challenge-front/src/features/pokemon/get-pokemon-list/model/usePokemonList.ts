import { useQuery } from "@tanstack/react-query";
import { fetchPokemon } from "../api/pokemon-api";

export const usePokemonList = () => {
  const pokemonQuery = useQuery({
    queryKey: ["pokemon"],
    queryFn: fetchPokemon,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  return {
    pokemon: {
      data: pokemonQuery.data,
      isLoading: pokemonQuery.isLoading,
      isError: pokemonQuery.isError,
    },
  };
};
