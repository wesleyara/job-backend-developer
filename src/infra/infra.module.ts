import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { EnvConfigModule } from './env-config/env-config.module';
import { ClientModule } from './client/client.module';
import { DatabaseModule } from './database/database.module';
import { CacheModule } from './cache/cache.module';

@Module({
  imports: [EnvConfigModule.forRoot(), HttpModule, ClientModule, DatabaseModule, CacheModule],
  providers: [],
  exports: [HttpModule],
})
export class InfraModule {}
