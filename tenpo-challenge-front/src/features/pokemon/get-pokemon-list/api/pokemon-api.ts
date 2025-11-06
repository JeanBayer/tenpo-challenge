import type { Pokemon } from "@entities/pokemon/model/types";
import { privateApi } from "@entities/user/api/private-api";
import type { PaginatedResponse } from "@shared/types/pagination";

type FetchPokemonParams = {
  offset?: number;
  limit?: number;
};

export const fetchPokemon = async ({
  offset,
  limit,
}: FetchPokemonParams): Promise<PaginatedResponse<Pokemon>> => {
  const { data } = await privateApi.get<PaginatedResponse<Pokemon>>(
    "/pokemon",
    {
      params: { offset, limit },
    }
  );
  return data;
};
