/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Injectable, OnModuleInit } from '@nestjs/common';
import { hashSync } from 'bcrypt';
import { readFileSync } from 'fs';
import { PrismaClient } from 'generated/prisma/client';

import { join } from 'path';

@Injectable()
export class SeedService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
  }

  private readDataFile<T>(filename: string): T {
    const filePath = join(process.cwd(), 'src', 'seed', 'data', filename);
    const fileContent = readFileSync(filePath, 'utf-8');
    return JSON.parse(fileContent) as T;
  }

  async seed() {
    console.log('🌱 Starting database seed...');

    await this.createUsers();
    await this.createPokemons();
  }

  async createUsers() {
    try {
      await this.user.deleteMany({});

      console.log('👤 Creating users...');
      const usersData = this.readDataFile<
        Array<{
          name: string;
          email: string;
          password: string;
        }>
      >('users.json');

      const usersWithHashedPasswords = usersData.map((user) => ({
        ...user,
        password: hashSync(user.password, 10),
      }));

      await this.user.createMany({
        data: usersWithHashedPasswords,
      });
      console.log(`   ✓ Created ${usersData.length} users`);
    } catch (error) {
      console.error('   ✗ Error creating users:', error);
    }
  }

  async createPokemons() {
    try {
      await this.pokemon.deleteMany({});

      console.log('📚 Creating pokemons...');
      const pokemonsData =
        this.readDataFile<
          Array<{ id: number; name: string; type: string; imageUrl: string }>
        >('pokemons.json');

      await this.pokemon.createMany({
        data: pokemonsData,
      });
      console.log(`   ✓ Created ${pokemonsData.length} pokemons`);
    } catch (error) {
      console.error('   ✗ Error creating pokemons:', error);
    }
  }
}
