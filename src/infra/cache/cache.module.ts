import { Module } from '@nestjs/common';
import { CacheModule as NestjsCacheModule } from '@nestjs/cache-manager';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as redisStore from 'cache-manager-redis-store';
import { CacheService } from './cache.service';

@Module({
  imports: [
    NestjsCacheModule.registerAsync({
      isGlobal: true,
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async () => {
        return {
          store: redisStore as any,
          host: process.env.REDIS_HOST,
          port: parseInt(process.env.REDIS_PORT),
          username: '',
          password: '',
          ttl: 120,
        };
      },
    }),
  ],
  providers: [CacheService],
  exports: [CacheService],
  controllers: [],
})
export class CacheModule {}
