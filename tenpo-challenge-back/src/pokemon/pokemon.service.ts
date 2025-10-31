import { Injectable } from '@nestjs/common';

@Injectable()
export class PokemonService {
  getHello(): string {
    return 'Hello Pokemon Service!';
  }
}
