import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class CacheService {
  @Inject(CACHE_MANAGER)
  private readonly cacheManager: Cache;

  set(key: string, value: any, seconds?: number): Promise<any> {
    try {
      if (seconds) {
        return this.cacheManager.set(key, value, { ttl: seconds } as any);
      }

      return this.cacheManager.set(key, value);
    } catch (error) {
      console.error(`Erro ao salvar cache '${key}': ${error}`);
    }
  }

  get(key: string): Promise<any> {
    try {
      return this.cacheManager.get(key);
    } catch (error) {
      console.error(`Erro ao buscar cache '${key}': ${error}`);
      return null;
    }
  }

  del(key: string): Promise<any> {
    try {
      return this.cacheManager.del(key);
    } catch (error) {
      console.error(`Erro ao deletar cache '${key}': ${error}`);
    }
  }

  reset(): Promise<void> {
    try {
      return this.cacheManager.reset();
    } catch (error) {
      console.error(`Erro ao resetar cache: ${error}`);
    }
  }

  getPrefix(prefix: string): Promise<any> {
    return this.cacheManager.store.keys(`${prefix}*`);
  }
}
