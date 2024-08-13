export interface IReviewRepository {
  findMany(): Promise<any>;
  findByTitle(title: string): Promise<any>;
  findByActor(actor: string): Promise<any>;
  findByDirector(director: string): Promise<any>;
  create(data: ReviewCreateInput): Promise<any>;
  update(id: string, data: ReviewUpdateInput): Promise<any>;
  delete(id: string): Promise<any>;
}

export interface ReviewCreateInput {
  title: string;
  notes: string;
  releasedAt: string;
  imdbRating: string;
  genre: string;
  director: string;
  poster: string;
  language: string;
  actors: string;
}

export interface ReviewUpdateInput {
  title: string;
  notes: string;
}
