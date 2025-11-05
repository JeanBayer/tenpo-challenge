import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchPokemon } from "../api/pokemon-api";

export const usePokemonList = () => {
  const pokemonQuery = useInfiniteQuery({
    queryKey: ["pokemon"],
    queryFn: ({ pageParam }) => fetchPokemon(pageParam),
    staleTime: 1000 * 60 * 5,
    initialPageParam: { offset: 0, limit: 20 },
    getNextPageParam: (lastPage) => {
      const limit = lastPage.paginated.limit;
      const offset = lastPage.paginated.offset + limit;
      if (offset >= lastPage.paginated.count) return undefined;
      return { offset, limit };
    },
  });

  return {
    pokemon: {
      data: pokemonQuery.data?.pages.flatMap((page) => page.data) ?? [],
      isLoading: pokemonQuery.isLoading,
      isError: pokemonQuery.isError,
      fetchNextPage: pokemonQuery.fetchNextPage,
      hasNextPage: pokemonQuery.hasNextPage,
      isFetching: pokemonQuery.isFetching,
      isFetchingNextPage: pokemonQuery.isFetchingNextPage,
    },
  };
};
