import { Component, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { Cart, CartStatus, CartProduct, CART_STATUS_LABELS } from '../../models/cart.model';
import { Product } from '../../../products/models/product.model';
import { PaymentModal } from '../../components/payment-modal/payment-modal';
import { AddProductModal } from '../../components/add-product-modal/add-product-modal';

const MOCK_CARTS: Cart[] = [
  {
    id: 1, customer_id: 101, status: 'ACT', total: 1389.98,
    products: [
      { product_id: 1, product_name: 'Laptop Dell XPS 15', price: 1299.99 },
      { product_id: 6, product_name: 'Webcam Logitech C920', price: 79.99 },
    ],
  },
  {
    id: 2, customer_id: 102, status: 'PAID', total: 449.99,
    products: [
      { product_id: 4, product_name: 'Monitor 4K LG 27"', price: 449.99 },
    ],
  },
  {
    id: 3, customer_id: 103, status: 'CANC', total: 0,
    products: [],
  },
  {
    id: 4, customer_id: 104, status: 'ACT', total: 209.98,
    products: [
      { product_id: 2, product_name: 'Mouse Logitech MX Master 3', price: 89.99 },
      { product_id: 3, product_name: 'Teclado Mecanico Keychron K2', price: 119.99 },
    ],
  },
  {
    id: 5, customer_id: 105, status: 'ACT', total: 499.98,
    products: [
      { product_id: 5, product_name: 'Auriculares Sony WH-1000XM5', price: 349.99 },
      { product_id: 7, product_name: 'SSD Samsung 1TB', price: 129.99 },
    ],
  },
  {
    id: 6, customer_id: 106, status: 'PAID', total: 169.98,
    products: [
      { product_id: 7, product_name: 'SSD Samsung 1TB', price: 129.99 },
      { product_id: 8, product_name: 'Hub USB-C Anker 7-en-1', price: 49.99 },
    ],
  },
];

@Component({
  selector: 'app-cart-detail',
  imports: [CommonModule, RouterLink, PaymentModal, AddProductModal],
  templateUrl: './cart-detail.html',
})
export class CartDetail {
  private route = inject(ActivatedRoute);

  cartId = Number(this.route.snapshot.paramMap.get('id'));
  cart = signal<Cart | undefined>(MOCK_CARTS.find(c => c.id === this.cartId));

  showPaymentModal = signal(false);
  showAddProductModal = signal(false);
  deleteConfirmProductId = signal<number | null>(null);

  existingProductIds = computed(() => this.cart()?.products.map(p => p.product_id) ?? []);

  confirmRemove(productId: number): void {
    this.deleteConfirmProductId.set(productId);
  }

  cancelRemove(): void {
    this.deleteConfirmProductId.set(null);
  }

  removeProduct(): void {
    const id = this.deleteConfirmProductId();
    if (id !== null) {
      this.cart.update(c => {
        if (!c) return c;
        const products = c.products.filter(p => p.product_id !== id);
        return { ...c, products, total: products.reduce((s, p) => s + p.price, 0) };
      });
      this.deleteConfirmProductId.set(null);
    }
  }

  onProductAdded(product: Product): void {
    this.cart.update(c => {
      if (!c) return c;
      const newProduct: CartProduct = {
        product_id: product.id,
        product_name: product.name,
        price: product.price,
      };
      const products = [...c.products, newProduct];
      return { ...c, products, total: products.reduce((s, p) => s + p.price, 0) };
    });
  }

  onPaid(): void {
    this.cart.update(c => (c ? { ...c, status: 'PAID' } : c));
    this.showPaymentModal.set(false);
  }

  getStatusClass(status: CartStatus): string {
    const map: Record<CartStatus, string> = {
      ACT: 'bg-emerald-100 text-emerald-700',
      PAID: 'bg-blue-100 text-blue-700',
      CANC: 'bg-rose-100 text-rose-700',
    };
    return map[status];
  }

  getStatusLabel(status: CartStatus): string {
    return CART_STATUS_LABELS[status];
  }
}
