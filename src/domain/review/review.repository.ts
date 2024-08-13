import { Injectable } from '@nestjs/common';
import { IReviewRepository, ReviewCreateInput } from './interface/review.interface';
import { ILike, Repository } from 'typeorm';
import { Review } from './entities/review.entity';
import { UpdateReviewDto } from './dto/update-review.dto';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ReviewRepository implements IReviewRepository {
  constructor(@InjectRepository(Review) private entityManager: Repository<Review>) {}

  async findMany() {
    return this.entityManager.find();
  }

  async findByTitle(title: string): Promise<any> {
    return this.entityManager.find({
      where: {
        title: ILike(`%${title.toLowerCase()}%`),
      },
    });
  }

  async findByActor(actor: string): Promise<any> {
    return this.entityManager.find({ where: { actors: ILike(`%${actor}%`) } });
  }

  async findByDirector(director: string): Promise<any> {
    return this.entityManager.find({ where: { director: ILike(`%${director}%`) } });
  }

  async create(data: ReviewCreateInput) {
    const review = new Review(data);
    return this.entityManager.save(review);
  }

  async update(id: string, data: UpdateReviewDto) {
    return this.entityManager.update(id, data);
  }

  async delete(id: string) {
    return this.entityManager.delete(id);
  }
}
