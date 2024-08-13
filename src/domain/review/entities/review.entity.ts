import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Review {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  title: string;

  @Column()
  notes: string;

  @Column()
  releasedAt: string;

  @Column()
  imdbRating: string;

  @Column()
  genre: string;

  @Column()
  director: string;

  @Column()
  poster: string;

  @Column()
  language: string;

  @Column()
  actors: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  constructor(partial: Partial<Review>) {
    Object.assign(this, partial);
  }
}
