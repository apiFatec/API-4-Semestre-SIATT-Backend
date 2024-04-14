import { Module } from '@nestjs/common';
import { Api4SemService } from './api-4-sem.service';
import { Api4SemController } from './api-4-sem.controller';

@Module({
  controllers: [Api4SemController],
  providers: [Api4SemService],
})
export class Api4SemModule {}
