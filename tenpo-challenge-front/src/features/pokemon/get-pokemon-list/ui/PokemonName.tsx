type PokemonNameProps = {
  name: string;
  color: string;
};

export const PokemonName = ({ name, color }: PokemonNameProps) => {
  return (
    <h3
      className="text-3xl font-extrabold capitalize leading-none"
      style={{ color }}
    >
      {name}
    </h3>
  );
};
