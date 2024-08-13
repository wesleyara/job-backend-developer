import { Inject, Injectable } from '@nestjs/common';
import { ReviewCreateInput } from './interface/review.interface';
import { CreateReviewDto } from './dto/create-review.dto';
import { OmdbService } from 'src/infra/client/omdb/omdb.service';
import { ReviewRepository } from './review.repository';
import { UpdateReviewDto } from './dto/update-review.dto';

@Injectable()
export class ReviewService {
  @Inject(ReviewRepository)
  private readonly reviewRepository: ReviewRepository;

  @Inject(OmdbService)
  private readonly omdbService: OmdbService;

  async findAll() {
    return this.reviewRepository.findMany();
  }

  async findByTitle(title: string) {
    const replacedTitle = title.replace(/%20/g, ' ');

    return this.reviewRepository.findByTitle(replacedTitle);
  }

  async findByActor(actor: string) {
    const replacedActor = actor.replace(/%20/g, ' ');

    return this.reviewRepository.findByActor(replacedActor);
  }

  async findByDirector(director: string) {
    const replacedDirector = director.replace(/%20/g, ' ');

    return this.reviewRepository.findByDirector(replacedDirector);
  }

  async create(data: CreateReviewDto) {
    if (!data.title) {
      throw new Error('Title is required');
    }

    if (!data.notes) {
      throw new Error('Notes is required');
    }

    const titleWithoutSpaces = data.title.replace(/\s/g, '%2B');
    const response = await this.omdbService.searchByTitle(titleWithoutSpaces);
    const omdbData = response.data;

    if (omdbData.Response === 'False') {
      throw new Error('Movie not found');
    }

    const reviewData: ReviewCreateInput = {
      title: omdbData.Title,
      notes: data.notes,
      releasedAt: omdbData.Released,
      imdbRating: omdbData.imdbRating,
      genre: omdbData.Genre,
      director: omdbData.Director,
      poster: omdbData.Poster,
      language: omdbData.Language,
      actors: omdbData.Actors,
    };

    return this.reviewRepository.create(reviewData);
  }

  async update(id: string, data: UpdateReviewDto) {
    return this.reviewRepository.update(id, data);
  }

  async delete(id: string) {
    return this.reviewRepository.delete(id);
  }
}
