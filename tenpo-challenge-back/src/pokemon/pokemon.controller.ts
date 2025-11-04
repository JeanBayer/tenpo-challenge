import { AuthGuard } from '@/auth/guards';
import { PaginatedResponseDto } from '@/shared/dto/paginated-response.dto';
import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { PokemonListResponseDto } from './dto/pokemon-list-response.dto';
import { PokemonQueryListDto } from './dto/pokemon-query-list.dto';
import { PokemonService } from './pokemon.service';

@Controller('pokemon')
@UseGuards(AuthGuard)
export class PokemonController {
  constructor(private readonly pokemonService: PokemonService) {}

  @Get()
  getPokemonList(
    @Query() query: PokemonQueryListDto,
  ): Promise<PaginatedResponseDto<PokemonListResponseDto>> {
    return this.pokemonService.getPokemonList(query);
  }
}
