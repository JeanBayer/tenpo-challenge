type PokemonTypeProps = {
  type: string;
  icon: string;
};

export const PokemonType = ({ type, icon }: PokemonTypeProps) => {
  return (
    <div className="flex items-center w-full gap-1.5">
      <img src={icon} alt={type} className="w-3 h-3" />
      <span className="text-xs font-medium capitalize text-gray-600">
        {type}
      </span>
    </div>
  );
};
