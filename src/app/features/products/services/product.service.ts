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

  public createProduct(product: Omit<Product, 'id'>) {
    return this.productClient.create<Product>(product);
  }

  public updateProduct(product: Product) {
    return this.productClient.update<Product>(product.id, product);
  }

  public deleteProduct(id: string|number) {
    return this.productClient.delete<Product>(id);
  }
}
