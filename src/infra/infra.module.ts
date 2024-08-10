import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { EnvConfigModule } from './env-config/env-config.module';

@Module({
  imports: [EnvConfigModule.forRoot(), HttpModule],
  exports: [HttpModule],
})
export class InfraModule {}
