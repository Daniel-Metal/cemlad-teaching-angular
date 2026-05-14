import { Injectable } from '@angular/core';
import { HttpClientService } from '../../../core/services/http-client.service';

@Injectable({
  providedIn: 'root',
})
export class ProductClient extends HttpClientService {
  constructor() {
    super('products');
  }
}
