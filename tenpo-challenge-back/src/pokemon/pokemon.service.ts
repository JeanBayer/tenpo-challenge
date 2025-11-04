import { PaginatedResponseDto } from '@/shared/dto/paginated-response.dto';
import { Injectable, OnModuleInit } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { PrismaClient } from 'generated/prisma/client';
import { PokemonListResponseDto } from './dto/pokemon-list-response.dto';
import { PokemonQueryListDto } from './dto/pokemon-query-list.dto';

@Injectable()
export class PokemonService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
  }

  async getPokemonList(
    query: PokemonQueryListDto,
  ): Promise<PaginatedResponseDto<PokemonListResponseDto>> {
    const countPokemon = await this.pokemon.count();
    const pokemonList = await this.pokemon.findMany({
      take: query.limit,
      skip: query.offset,
    });
    const pokemonDto: PokemonListResponseDto[] = pokemonList?.map((pokemon) =>
      plainToInstance(
        PokemonListResponseDto,
        {
          id: Number(pokemon.id),
          name: pokemon.name,
          type: pokemon.type,
          imageUrl: pokemon.imageUrl,
        },
        {
          excludeExtraneousValues: true,
        },
      ),
    );

    const paginatedResponse = plainToInstance(
      PaginatedResponseDto<PokemonListResponseDto>,
      {
        data: pokemonDto,
        paginated: {
          count: countPokemon,
          limit: query.limit,
          offset: query.offset,
        },
      },
      {
        excludeExtraneousValues: true,
      },
    );

    return paginatedResponse;
  }
}
