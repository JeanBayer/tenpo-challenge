type PokemonTypeProps = {
  type: string;
  icon: string;
};

export const PokemonType = ({ type, icon }: PokemonTypeProps) => {
  return (
    <div className="flex items-center gap-1.5">
      <img src={icon} alt={type} className="w-4 h-4" />
      <span className="text-xs font-medium capitalize text-gray-600">
        {type}
      </span>
    </div>
  );
};
