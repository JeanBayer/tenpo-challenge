import { Module } from '@nestjs/common';
import { SeedModule } from '@seed/seed.module';
import { AuthModule } from './auth/auth.module';
import { PokemonModule } from './pokemon/pokemon.module';

@Module({
  imports: [SeedModule, AuthModule, PokemonModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
