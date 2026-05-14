import { Injectable } from '@angular/core';
import { HttpClientService } from '../../../core/services/http-client.service';
import { Cart } from '../models/cart.model';
import { Product } from '../../products/models/product.model';
import { PaymentMethod } from '../enums/cart.enum';

@Injectable({
  providedIn: 'root',
})
export class CartClient extends HttpClientService {
  constructor() {
    super('carts');
  }

  getProducts<Product>(cartId: number) {
    return this.http.get<Product[]>(
      `${this.baseUrl}/carts/${cartId}/products`
    );
  }

  pay(cartId: number, paymentMethod: PaymentMethod) {
    return this.http.post<{ message: string }>(
      `${this.baseUrl}/carts/${cartId}/pay`,
      { payment_method: paymentMethod }
    );
  }

  addProduct(cartId: number, productId: number) {
    return this.http.post<Cart>(
      `${this.baseUrl}/carts/${cartId}/products`,
      { product_id: productId }
    );
  }

  removeProduct(cartId: number, productId: number) {
    return this.http.delete<Cart>(
      `${this.baseUrl}/carts/${cartId}/products/${productId}`
    );
  }
}
