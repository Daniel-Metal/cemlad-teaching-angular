import { HttpClient } from '@angular/common/http';
import { Injectable, inject, Inject } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export abstract class HttpClientService {
  protected http = inject(HttpClient);

  protected baseUrl = environment.apiBaseUrl;

  constructor(@Inject('PATH') private path: string) {}

  public getAll<T>() {
    return this.http.get<T>(`${this.baseUrl}/${this.path}`);
  }

  public getOne<T>(id : string) {
    return this.http.get<T>(`${this.baseUrl}/${this.path}/${id}`);
  }

  public create<T>(data: any) {
    return this.http.post<T>(`${this.baseUrl}/${this.path}`, data);
  }

  public update<T>(id: string|number, data: any) {
    return this.http.put<T>(`${this.baseUrl}/${this.path}/${id}`, data);
  }

  public patch<T>(id: string|number, data: any) {
    return this.http.patch<T>(`${this.baseUrl}/${this.path}/${id}`, data);
  }

  public delete<T>(id: string|number) {
    return this.http.delete<T>(`${this.baseUrl}/${this.path}/${id}`);
  }
}
