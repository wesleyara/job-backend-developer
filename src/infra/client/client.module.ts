import { Module } from '@nestjs/common';
import { OmdbService } from './omdb/omdb.service';
import { HttpModule } from '@nestjs/axios';
import { HttpClientService } from '../http/http.service';

@Module({
  imports: [HttpModule],
  providers: [OmdbService, HttpClientService],
  exports: [OmdbService],
})
export class ClientModule {}
