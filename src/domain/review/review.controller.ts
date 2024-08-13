import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ReviewService } from './review.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';

@Controller('review')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @Get()
  findByFilter(@Query('title') title: string, @Query('actor') actor: string, @Query('director') director: string) {
    if (title) {
      return this.reviewService.findByTitle(title);
    }

    if (actor) {
      return this.reviewService.findByActor(actor);
    }

    if (director) {
      return this.reviewService.findByDirector(director);
    }

    return this.reviewService.findAll();
  }

  @Post('create')
  create(@Body() createReviewDto: CreateReviewDto) {
    return this.reviewService.create(createReviewDto);
  }

  @Patch('update/:id')
  update(@Param('id') id: string, @Body() updateReviewDto: UpdateReviewDto) {
    return this.reviewService.update(id, updateReviewDto);
  }

  @Delete('delete/:id')
  delete(@Param('id') id: string) {
    return this.reviewService.delete(id);
  }
}
