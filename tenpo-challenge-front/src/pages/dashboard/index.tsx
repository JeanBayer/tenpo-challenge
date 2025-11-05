import { usePokemonList } from "@features/pokemon/get-pokemon-list/model/usePokemonList";
import { PokemonList } from "@features/pokemon/get-pokemon-list/ui/PokemonList";

export default function DashboardPage() {
  const { pokemon } = usePokemonList();

  if (pokemon.isLoading) {
    return <div>Loading...</div>;
  }

  if (!pokemon.data) {
    return <div>No data available</div>;
  }

  return <PokemonList pokemonList={pokemon.data?.data} />;
}
