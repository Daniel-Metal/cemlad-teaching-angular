import { Component, inject, signal, computed, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { Cart } from '../../models/cart.model';
import { Product } from '../../../products/models/product.model';

type CartWithProducts = Cart & { products: Product[] };
import { PaymentModal } from '../../components/payment-modal/payment-modal';
import { AddProductModal } from '../../components/add-product-modal/add-product-modal';
import { CartService } from '../../services/cart.service';
import { CartStatus, CART_STATUS_LABELS, PaymentMethod } from '../../enums/cart.enum';

@Component({
  selector: 'app-cart-detail',
  imports: [CommonModule, RouterLink, PaymentModal, AddProductModal],
  templateUrl: './cart-detail.html',
})
export class CartDetail implements OnInit {
  private route = inject(ActivatedRoute);
  private cartService = inject(CartService);

  cartId = Number(this.route.snapshot.paramMap.get('id'));
  cart = signal<CartWithProducts | undefined>(undefined);

  showPaymentModal = signal(false);
  showAddProductModal = signal(false);
  deleteConfirmProductId = signal<number | null>(null);

  existingProductIds = computed(() => this.cart()?.products.map(p => p.id) ?? []);

  ngOnInit() {
    this.loadCart();
  }

  loadCart() {
    this.cartService.getCartById(this.cartId).subscribe({
      next: cart => this.cart.set({ ...cart, products: [] }),
      error: err => console.error('Error fetching cart:', err),
    });

    this.cartService.getProductsInCart(this.cartId).subscribe({
      next: products => {
        const currentCart = this.cart();
        if (currentCart) {
          this.cart.set({ ...currentCart, products: products.flat() });
        }
      },
      error: err => console.error('Error fetching cart products:', err),
    });
  }

  confirmRemove(productId: number): void {
    this.deleteConfirmProductId.set(productId);
  }

  cancelRemove(): void {
    this.deleteConfirmProductId.set(null);
  }

  removeProduct(): void {
    const productId = this.deleteConfirmProductId();
    if (productId === null) return;
    this.cartService.removeProductFromCart(this.cartId, productId).subscribe({
      next: updatedCart => {
        this.cart.set({ ...updatedCart, products: updatedCart.products?.flat() ?? [] });
        this.deleteConfirmProductId.set(null);
        this.cartService.notifyCartsUpdated();
      },
      error: err => console.error('Error removing product:', err),
    });
  }

  onProductAdded(product: Product): void {
    this.cartService.addProductToCart(this.cartId, product.id).subscribe({
      next: () => {
        this.cartService.getCartById(this.cartId).subscribe({
          next: updatedCart => {
            this.cartService.getProductsInCart(this.cartId).subscribe({
              next: products => {
                this.cart.set({ ...updatedCart, products: products.flat() });
                this.cartService.notifyCartsUpdated();
              },
              error: err => console.error('Error fetching cart products:', err),
            });
          },
          error: err => console.error('Error fetching cart:', err),
        });
      },
      error: err => console.error('Error adding product:', err),
    });
  }

  onPaid(method: PaymentMethod): void {
    this.cartService.payCart(this.cartId, method).subscribe({
      next: () => {
        this.loadCart();
        this.showPaymentModal.set(false);
        this.cartService.notifyCartsUpdated();
      },
      error: err => console.error('Error processing payment:', err),
    });
  }

  getStatusClass(status: CartStatus): string {
    const map: Record<CartStatus, string> = {
      ACT: 'bg-emerald-100 text-emerald-700',
      PAG: 'bg-blue-100 text-blue-700',
    };
    return map[status];
  }

  getStatusLabel(status: CartStatus): string {
    return CART_STATUS_LABELS[status];
  }
}
