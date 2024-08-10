import { Module } from '@nestjs/common';
import { HttpModule as NestjsHttpModule } from '@nestjs/axios';
import { HttpClientService } from './http.service';

@Module({
  imports: [
    NestjsHttpModule.register({
      timeout: 30000,
      maxRedirects: 3,
    }),
  ],
  providers: [HttpClientService],
  exports: [HttpClientService],
})
export class HttpModule {}
