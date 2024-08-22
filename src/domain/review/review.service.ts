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

  async findAll(sort?: string, order?: string) {
    const response = await this.reviewRepository.findMany();

    if (sort && order) {
      return response.sort((a, b) => {
        if (order === 'asc') {
          return a[sort] > b[sort] ? 1 : -1;
        }

        return a[sort] < b[sort] ? 1 : -1;
      });
    }

    return response;
  }

  async findByTitle(title: string, sort?: string, order?: string) {
    const replacedTitle = title.replace(/%20/g, ' ');

    const response = await this.reviewRepository.findByTitle(replacedTitle);

    if (sort && order) {
      return response.sort((a, b) => {
        if (order === 'asc') {
          return a[sort] > b[sort] ? 1 : -1;
        }

        return a[sort] < b[sort] ? 1 : -1;
      });
    }

    return response;
  }

  async findByActor(actor: string, sort?: string, order?: string) {
    const replacedActor = actor.replace(/%20/g, ' ');

    const response = await this.reviewRepository.findByActor(replacedActor);

    if (sort && order) {
      return response.sort((a, b) => {
        if (order === 'asc') {
          return a[sort] > b[sort] ? 1 : -1;
        }

        return a[sort] < b[sort] ? 1 : -1;
      });
    }

    return response;
  }

  async findByDirector(director: string, sort?: string, order?: string) {
    const replacedDirector = director.replace(/%20/g, ' ');

    const response =
      await this.reviewRepository.findByDirector(replacedDirector);

    if (sort && order) {
      return response.sort((a, b) => {
        if (order === 'asc') {
          return a[sort] > b[sort] ? 1 : -1;
        }

        return a[sort] < b[sort] ? 1 : -1;
      });
    }

    return response;
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
