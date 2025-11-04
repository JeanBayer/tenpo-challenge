import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class PokemonListResponseDto {
  @Expose()
  id: number;

  @Expose()
  name: string;

  @Expose()
  type: string;

  @Expose()
  imageUrl: string;
}
