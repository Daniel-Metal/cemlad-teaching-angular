import { inject, Inject, Injectable } from '@angular/core';
import { ProductClient } from '../clients/product.client';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private productClient = inject(ProductClient);
  constructor() {}

  public getAllProducts() {
    return this.productClient.getAll<Product[]>();
  }

  public getProductById(id: string) {
    return this.productClient.getOne<Product>(id);
  }
}
