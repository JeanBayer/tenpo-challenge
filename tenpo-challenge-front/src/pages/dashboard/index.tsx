import { usePokemonList } from "@features/pokemon/get-pokemon-list/model/usePokemonList";
import { PokemonList } from "@features/pokemon/get-pokemon-list/ui/PokemonList";

export default function DashboardPage() {
  const { pokemon } = usePokemonList();

  if (pokemon.isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-linear-to-br from-sky-100 via-white to-amber-100">
        <div className="rounded-3xl bg-white/80 px-6 py-8 text-center shadow-lg backdrop-blur">
          <p className="text-base font-semibold text-slate-700">
            Loading your Pokedex...
          </p>
        </div>
      </div>
    );
  }

  if (!pokemon.data) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-linear-to-br from-sky-100 via-white to-amber-100">
        <div className="max-w-sm rounded-3xl bg-white/80 px-6 py-8 text-center shadow-lg backdrop-blur">
          <p className="text-lg font-semibold text-slate-900">
            No Pokemon available
          </p>
          <p className="mt-2 text-sm text-slate-600">
            Something went wrong while fetching the roster. Please try
            refreshing the page.
          </p>
        </div>
      </div>
    );
  }

  return (
    <main className="bg-linear-to-br from-sky-100 via-white to-amber-100">
      <div className="mx-auto flex w-full max-w-xl flex-col px-4 pb-12 pt-10 sm:px-6 lg:px-8">
        <header className="mb-6 text-center sm:mb-10">
          <span className="text-xs font-semibold uppercase tracking-[0.4em] text-sky-500">
            Pokemon League Archive
          </span>
          <h1 className="mt-3 text-3xl font-bold text-slate-900 sm:text-4xl">
            Explore the Kanto roster
          </h1>
          <p className="mt-3 text-sm text-slate-600 sm:text-base">
            Scroll through the catalog and discover stats, types, and abilities
            for each Pokemon.
          </p>
        </header>

        <section className="flex-1 bg-white/70 p-4 shadow-xl ring-1 ring-slate-200/70 backdrop-blur">
          <PokemonList pokemonList={pokemon.data?.data} />
          <div className="border-t border-slate-200">
            <p className="mt-6 text-center text-xs text-slate-500">
              Data provided by{" "}
              <a
                href="https://pokeapi.co/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium underline hover:text-slate-700"
              >
                PokeAPI
              </a>
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
