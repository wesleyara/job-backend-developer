import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../prisma.service';

describe('PrismaService', () => {
  let sut: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PrismaService],
    }).compile();

    sut = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(sut).toBeDefined();
  });
});
