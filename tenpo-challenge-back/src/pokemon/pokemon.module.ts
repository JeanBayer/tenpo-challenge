import { AuthModule } from '@auth/auth.module';
import { Module } from '@nestjs/common';
import { PokemonController } from './pokemon.controller';
import { PokemonService } from './pokemon.service';

@Module({
  controllers: [PokemonController],
  providers: [PokemonService],
  imports: [AuthModule],
})
export class PokemonModule {}
