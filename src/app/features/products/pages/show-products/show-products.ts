import { ProductService } from './../../services/product.service';
import { Component, signal, computed, Inject, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '../../models/product.model';
import { DetailModal } from '../../components/detail-modal/detail-modal';
import { CreateEditModal } from '../../components/create-edit-modal/create-edit-modal';

const CARD_GRADIENTS = [
  'bg-linear-to-br from-indigo-500 to-indigo-700',
  'bg-linear-to-br from-violet-500 to-violet-700',
  'bg-linear-to-br from-blue-500 to-blue-700',
  'bg-linear-to-br from-emerald-500 to-emerald-700',
  'bg-linear-to-br from-amber-500 to-amber-600',
  'bg-linear-to-br from-rose-500 to-rose-700',
  'bg-linear-to-br from-cyan-500 to-cyan-700',
  'bg-linear-to-br from-fuchsia-500 to-fuchsia-700',
];

@Component({
  selector: 'app-show-products',
  imports: [CommonModule, DetailModal, CreateEditModal],
  templateUrl: './show-products.html',
  styleUrl: './show-products.css',
})
export class ShowProducts implements OnInit {
  productService = inject(ProductService);

  products = signal<Product[]>([]);
  searchQuery = signal('');
  showModal = signal(false);
  showDetailModal = signal(false);
  selectedProduct = signal<Product | null>(null);
  deleteConfirmId = signal<number | null>(null);

  filteredProducts = computed(() => {
    const q = this.searchQuery().toLowerCase();
    return !q
      ? this.products()
      : this.products().filter(
          p => p.name.toLowerCase().includes(q) || p.code.toLowerCase().includes(q)
        );
  });

  totalValue = computed(() => this.products().reduce((sum, p) => sum + p.price, 0));
  avgPrice = computed(() => (this.products().length > 0 ? this.totalValue() / this.products().length : 0));

  loadProducts() {
    this.productService.getAllProducts().subscribe({
      next: products => this.products.set(products),
      error: err => console.error('Error fetching products:', err)
    });
  }

  ngOnInit() {
    this.loadProducts();
  }

  onSearch(event: Event) {
    this.searchQuery.set((event.target as HTMLInputElement).value);
  }

  openCreate() {
    this.selectedProduct.set(null);
    this.showModal.set(true);
  }

  editProduct(p: Product) {
    this.productService.getProductById(p.id.toString()).subscribe({
      next: product => {
        this.selectedProduct.set(product);
        this.showDetailModal.set(true);
      },
      error: err => console.error('Error fetching product details:', err)
    });

    this.showModal.set(true);
  }

  viewProduct(p: Product) {
    this.productService.getProductById(p.id.toString()).subscribe({
      next: product => {
        this.selectedProduct.set(product);
        this.showDetailModal.set(true);
      },
      error: err => console.error('Error fetching product details:', err)
    });

    this.showDetailModal.set(true);
  }

  closeModal() {
    this.showModal.set(false);
    this.selectedProduct.set(null);
    this.loadProducts();
  }

  closeDetail() {
    this.showDetailModal.set(false);
    this.selectedProduct.set(null);
    this.loadProducts();
  }

  confirmDelete(id: number) {
    this.deleteConfirmId.set(id);
  }

  cancelDelete() {
    this.deleteConfirmId.set(null);
  }

  executeDelete() {
    this.productService.deleteProduct(this.deleteConfirmId()!).subscribe({
      next: () => {
        console.log("Product deleted successfully");

        this.loadProducts();
        this.deleteConfirmId.set(null);
      },
      error: err => console.error('Error deleting product:', err)
    });
  }

  getGradient(index: number): string {
    return CARD_GRADIENTS[index % CARD_GRADIENTS.length];
  }
}
