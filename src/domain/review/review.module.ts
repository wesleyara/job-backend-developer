import { Module } from '@nestjs/common';
import { ReviewService } from './review.service';
import { ReviewController } from './review.controller';
import { ReviewRepository } from './review.repository';
import { ClientModule } from 'src/infra/client/client.module';
import { OmdbService } from 'src/infra/client/omdb/omdb.service';
import { HttpModule } from '@nestjs/axios';
import { HttpClientService } from 'src/infra/http/http.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Review } from './entities/review.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Review]), ClientModule, HttpModule],
  providers: [ReviewService, OmdbService, HttpClientService, ReviewRepository],
  controllers: [ReviewController],
})
export class ReviewModule {}
