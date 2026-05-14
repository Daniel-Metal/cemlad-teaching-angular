import { Component, signal, computed, inject, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Cart } from '../../models/cart.model';
import { CreateCartModal } from '../../components/create-cart-modal/create-cart-modal';
import { CartService } from '../../services/cart.service';
import { Product } from '../../../products/models/product.model';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CART_STATUS_LABELS, CART_STATUS_ACTIVE, CART_STATUS_PAID, CartStatus } from '../../enums/cart.enum';

type CartWithProducts = Cart & { products: Product[] };

@Component({
  selector: 'app-show-carts',
  imports: [CommonModule, RouterLink, CreateCartModal],
  templateUrl: './show-carts.html',
})
export class ShowCarts implements OnInit, OnDestroy {
  private cartService = inject(CartService);
  private destroy$ = new Subject<void>();

  carts = signal<CartWithProducts[]>([]);
  showCreateModal = signal(false);
  filterStatus = signal<CartStatus | 'ALL'>(CART_STATUS_ACTIVE);

  filteredCarts = computed(() => {
    const status = this.filterStatus();
    console.log(status);

    return status === 'ALL' ? this.carts() : this.carts().filter(c => c.status === status);
  });

  activeCarts = computed(() => this.carts().filter(c => c.status === CART_STATUS_ACTIVE).length);
  paidCarts = computed(() => this.carts().filter(c => c.status === CART_STATUS_PAID).length);
  totalRevenue = computed(() =>
    this.carts().filter(c => c.status === CART_STATUS_PAID).reduce((sum, c) => sum + c.total, 0)
  );

  ngOnInit() {
    this.loadCarts();
    this.cartService.cartsUpdated$
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => this.loadCarts());
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  loadCarts() {
    this.cartService.getAllCarts().subscribe({
      next: carts => this.carts.set(carts.map(c => ({ ...c, products: c.products ?? [] }))),
      error: err => console.error('Error fetching carts:', err),
    });
  }

  onCartCreated(customerId: number) {
    this.cartService.createCart({ customer_id: customerId }).subscribe({
      next: () => {
        this.showCreateModal.set(false);
        this.cartService.notifyCartsUpdated();
      },
      error: err => console.error('Error creating cart:', err),
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
