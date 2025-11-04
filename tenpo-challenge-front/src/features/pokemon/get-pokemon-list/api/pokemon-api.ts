import type { Pokemon } from "@entities/pokemon/model/types";
import privateApi from "@shared/api/axios";
import type { PaginatedResponse } from "@shared/types/pagination";

export const fetchPokemon = async (): Promise<PaginatedResponse<Pokemon>> => {
  const { data } = await privateApi.get<PaginatedResponse<Pokemon>>("/pokemon");
  return data;
};
