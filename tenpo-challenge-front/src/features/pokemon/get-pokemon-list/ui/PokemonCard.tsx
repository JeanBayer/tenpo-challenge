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
    <Card className="relative overflow-visible w-full h-28">
      <Card.Content className="flex items-end justify-between py-3 px-4 h-full">
        <div className="flex flex-col gap-1 z-10">
          <PokemonName name={pokemon.name} color={color} />
          <PokemonType type={pokemon.type} icon={icon} />
        </div>

        <PokemonImage imageUrl={pokemon.imageUrl} name={pokemon.name} />
      </Card.Content>
    </Card>
  );
};
