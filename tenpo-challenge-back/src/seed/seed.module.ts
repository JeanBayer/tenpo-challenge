import { Module } from '@nestjs/common';
import { SeedController } from '@seed/seed.controller';
import { SeedService } from '@seed/seed.service';

@Module({
  controllers: [SeedController],
  providers: [SeedService],
})
export class SeedModule {}
