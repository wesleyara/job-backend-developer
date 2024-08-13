import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { EnvConfigModule } from './env-config/env-config.module';
import { ClientModule } from './client/client.module';

@Module({
  imports: [EnvConfigModule.forRoot(), HttpModule, ClientModule],
  providers: [],
  exports: [HttpModule],
})
export class InfraModule {}
