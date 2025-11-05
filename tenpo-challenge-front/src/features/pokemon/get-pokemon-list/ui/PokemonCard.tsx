import type { Pokemon } from "@entities/pokemon/model/types";
import { Card } from "@shared/ui/Card";
import { getTypeConfig } from "../lib/pokemon-type-config";
import { PokemonImage } from "./PokemonImage";
import { PokemonName } from "./PokemonName";
import { PokemonType } from "./PokemonType";

type PokemonCardProps = {
  pokemon: Pokemon;
};

export const PokemonCard = ({ pokemon }: PokemonCardProps) => {
  const { color, icon } = getTypeConfig(pokemon.type);

  return (
    <Card className="relative overflow-visible h-36 border-0 w-full max-w-[280px] rounded-2xl bg-white/90 px-5 py-6 shadow-lg ring-1 ring-slate-200/60 backdrop-blur transition duration-200 hover:-translate-y-1 hover:shadow-xl">
      <Card.Content className="flex items-center justify-between py-3 px-4 h-full">
        <div className="flex flex-col items-center gap-1 z-10">
          <PokemonName name={pokemon.name} color={color} />
          <PokemonType type={pokemon.type} icon={icon} />
        </div>

        <PokemonImage imageUrl={pokemon.imageUrl} name={pokemon.name} />
      </Card.Content>
    </Card>
  );
};
