import { ApiProperty } from '@nestjs/swagger';

export class CreateReviewDto {
  @ApiProperty()
  title: string;

  @ApiProperty()
  notes: string;
}
