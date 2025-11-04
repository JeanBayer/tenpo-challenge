import { usePokemonList } from "@/features/pokemon/get-pokemon-list/model/usePokemonList";
import { PokemonCard } from "@/features/pokemon/get-pokemon-list/ui/PokemonCard";

export default function DashboardPage() {
  const { pokemon } = usePokemonList();

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 via-purple-50 to-pink-50 p-8">
      <div className="max-w-8xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-extrabold text-gray-800 mb-2">
            Pokédex
          </h1>
          <p className="text-gray-600">Descubre y explora todos los Pokémon</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 place-items-center w-full">
          {pokemon.data?.data.map((p) => (
            <PokemonCard key={p.id} pokemon={p} />
          ))}
        </div>

        {!pokemon.data && (
          <div className="flex items-center justify-center h-64">
            <p className="text-gray-500 text-lg">Cargando Pokémon...</p>
          </div>
        )}
      </div>
    </div>
  );
}
