import { Injectable, inject } from '@angular/core';
import { Subject } from 'rxjs';
import { CartClient } from '../clients/cart.client';
import { Cart } from '../models/cart.model';
import { Product } from '../../products/models/product.model';
import { PaymentMethod } from '../enums/cart.enum';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartClient = inject(CartClient);
  private cartsUpdated = new Subject<void>();

  cartsUpdated$ = this.cartsUpdated.asObservable();

  getAllCarts() {
    return this.cartClient.getAll<Cart[]>();
  }

  getCartById(id: number) {
    return this.cartClient.getOne<Cart>(id.toString());
  }

  getProductsInCart(cartId: number) {
    return this.cartClient.getProducts<Product[]>(cartId);
  }

  createCart(data: { customer_id: number }) {
    return this.cartClient.create<Cart>(data);
  }

  payCart(cartId: number, paymentMethod: PaymentMethod) {
    return this.cartClient.pay(cartId, paymentMethod);
  }

  addProductToCart(cartId: number, productId: number) {
    return this.cartClient.addProduct(cartId, productId);
  }

  removeProductFromCart(cartId: number, productId: number) {
    return this.cartClient.removeProduct(cartId, productId);
  }

  notifyCartsUpdated() {
    this.cartsUpdated.next();
  }
}
