import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  Inject,
} from '@nestjs/common';
import { ReviewService } from './review.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { CacheService } from 'src/infra/cache/cache.service';

@Controller('review')
export class ReviewController {
  @Inject(ReviewService)
  private readonly reviewService: ReviewService;
  @Inject(CacheService)
  private readonly cacheService: CacheService;

  @Get()
  @ApiQuery({ name: 'title', required: false })
  @ApiQuery({ name: 'actor', required: false })
  @ApiQuery({ name: 'director', required: false })
  @ApiQuery({ name: 'sort', required: false })
  @ApiQuery({ name: 'order', required: false })
  @ApiTags('review')
  async findByFilter(
    @Query('title') title: string,
    @Query('actor') actor: string,
    @Query('director') director: string,
    @Query('sort') sort: string,
    @Query('order') order: string,
  ) {
    if (title) {
      return this.reviewService.findByTitle(title, sort, order);
    }

    if (actor) {
      return this.reviewService.findByActor(actor, sort, order);
    }

    if (director) {
      return this.reviewService.findByDirector(director, sort, order);
    }

    const cacheKey = 'reviews';

    const cachedReviews = await this.cacheService.get(cacheKey);

    if (cachedReviews) {
      return cachedReviews;
    }

    const reviews = await this.reviewService.findAll();

    await this.cacheService.set(cacheKey, reviews, 60);

    return reviews;
  }

  @Post('create')
  @ApiTags('review')
  create(@Body() createReviewDto: CreateReviewDto) {
    return this.reviewService.create(createReviewDto);
  }

  @Patch('update/:id')
  @ApiTags('review')
  update(@Param('id') id: string, @Body() updateReviewDto: UpdateReviewDto) {
    return this.reviewService.update(id, updateReviewDto);
  }

  @Delete('delete/:id')
  @ApiTags('review')
  delete(@Param('id') id: string) {
    return this.reviewService.delete(id);
  }
}
