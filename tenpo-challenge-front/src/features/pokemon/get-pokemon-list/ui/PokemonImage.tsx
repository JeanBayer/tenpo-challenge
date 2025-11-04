type PokemonImageProps = {
  imageUrl: string;
  name: string;
};

export const PokemonImage = ({ imageUrl, name }: PokemonImageProps) => {
  return (
    <div className="absolute z-10 bottom-2 right-2">
      <img
        src={imageUrl}
        alt={name}
        className="max-w-30 max-h-30 object-contain drop-shadow-lg"
      />
    </div>
  );
};
