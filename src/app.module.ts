import { Module } from '@nestjs/common';
import { EnvConfigModule } from './infra/env-config/env-config.module';

@Module({
  imports: [EnvConfigModule.forRoot()],
  controllers: [],
  providers: [],
})
export class AppModule {}
