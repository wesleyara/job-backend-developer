import { Test, TestingModule } from '@nestjs/testing';
import { OmdbService } from '../omdb.service';
import { HttpModule } from '@nestjs/axios';
import { HttpClientService } from 'src/infra/http/http.service';

describe('OmdbService', () => {
  let sut: OmdbService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      providers: [OmdbService, HttpClientService],
    }).compile();

    sut = module.get<OmdbService>(OmdbService);
  });

  it('should be defined', () => {
    expect(sut).toBeDefined();
  });

  it('should search by title', async () => {
    const title = 'Inception';
    const response = await sut.searchByTitle(title);

    expect(response.data.Title).toBe(title);
  });
});
