import { Injectable } from '@nestjs/common';
import { HttpClientService } from 'src/infra/http/http.service';

@Injectable()
export class OmdbService {
  constructor(private readonly httpClient: HttpClientService) {}

  async searchByTitle(title: string) {
    return this.httpClient.get(`http://www.omdbapi.com/?t=${title}&apikey=${process.env.OMDB_API_KEY}`);
  }
}
