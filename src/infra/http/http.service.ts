import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { AxiosRequestConfig } from 'axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class HttpClientService {
  constructor(private readonly httpService: HttpService) {}

  get<T = any>(url: string, config?: AxiosRequestConfig) {
    return firstValueFrom(this.httpService.get<T>(url, config));
  }

  delete<T = any>(url: string, config?: AxiosRequestConfig) {
    return firstValueFrom(this.httpService.delete<T>(url, config));
  }

  post<T = any>(url: string, data?: any, config?: AxiosRequestConfig) {
    return firstValueFrom(this.httpService.post<T>(url, data, config));
  }

  put<T = any>(url: string, data?: any, config?: AxiosRequestConfig) {
    return firstValueFrom(this.httpService.put<T>(url, data, config));
  }

  patch<T = any>(url: string, data?: any, config?: AxiosRequestConfig) {
    return firstValueFrom(this.httpService.patch<T>(url, data, config));
  }
}
