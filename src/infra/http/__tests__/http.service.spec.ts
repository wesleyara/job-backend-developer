import { Test, TestingModule } from '@nestjs/testing';
import { HttpClientService } from '../http.service';
import { HttpModule } from '@nestjs/axios';
import { of } from 'rxjs';
import { AxiosResponse } from 'axios';

describe('HttpClientService', () => {
  let sut: HttpClientService;
  const mockResponse: AxiosResponse = {
    data: { success: true },
    status: 200,
    statusText: 'OK',
    headers: {},
    config: {} as any,
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      providers: [HttpClientService],
    }).compile();

    sut = module.get<HttpClientService>(HttpClientService);
  });

  it('should be defined', () => {
    expect(sut).toBeDefined();
  });

  it('should perform GET request', done => {
    jest.spyOn(sut, 'get').mockImplementation(() => of(mockResponse).toPromise());

    sut.get('https://api.example.com').then(response => {
      expect(response.data).toEqual({ success: true });
      done();
    });
  });

  it('should perform POST request', done => {
    mockResponse.status = 201;

    jest.spyOn(sut, 'post').mockImplementation(() => of(mockResponse).toPromise());

    sut.post('https://api.example.com', { data: 'test' }).then(response => {
      expect(response.data).toEqual({ success: true });
      done();
    });
  });

  it('should perform PUT request', done => {
    jest.spyOn(sut, 'put').mockImplementation(() => of(mockResponse).toPromise());

    sut.put('https://api.example.com', { data: 'test' }).then(response => {
      expect(response.data).toEqual({ success: true });
      done();
    });
  });

  it('should perform PATCH request', done => {
    jest.spyOn(sut, 'patch').mockImplementation(() => of(mockResponse).toPromise());

    sut.patch('https://api.example.com', { data: 'test' }).then(response => {
      expect(response.data).toEqual({ success: true });
      done();
    });
  });

  it('should perform DELETE request', done => {
    jest.spyOn(sut, 'delete').mockImplementation(() => of(mockResponse).toPromise());

    sut.delete('https://api.example.com').then(response => {
      expect(response.data).toEqual({ success: true });
      done();
    });
  });
});
