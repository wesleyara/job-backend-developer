import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { EnvConfigModule } from './env-config/env-config.module';
import { PrismaService } from './prisma/prisma.service';

@Module({
  imports: [EnvConfigModule.forRoot(), HttpModule],
  providers: [PrismaService],
  exports: [HttpModule],
})
export class InfraModule {}
