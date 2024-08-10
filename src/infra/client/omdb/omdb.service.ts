import { Injectable } from '@nestjs/common';
import { HttpClientService } from 'src/infra/http/http.service';
import { SearchByTitleResponse } from './interface/omdb.interface';

@Injectable()
export class OmdbService {
  constructor(private readonly httpClient: HttpClientService) {}

  async searchByTitle(title: string) {
    return this.httpClient.get<SearchByTitleResponse>(`http://www.omdbapi.com/?t=${title}&apikey=${process.env.OMDB_API_KEY}`);
  }
}
