import { AuthGuard } from '@/auth/guards';
import { Controller, Get, UseGuards } from '@nestjs/common';
import { PokemonService } from './pokemon.service';

@Controller('pokemon')
@UseGuards(AuthGuard)
export class PokemonController {
  constructor(private readonly pokemonService: PokemonService) {}

  @Get()
  getHello(): string {
    return this.pokemonService.getHello();
  }
}
