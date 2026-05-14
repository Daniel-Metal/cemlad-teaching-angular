import { Component, Input, Output, EventEmitter, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '../../../products/models/product.model';
import { ProductService } from '../../../products/services/product.service';

@Component({
  selector: 'app-add-product-modal',
  imports: [CommonModule],
  templateUrl: './add-product-modal.html',
})
export class AddProductModal implements OnInit {
  private productService = inject(ProductService);

  @Input() show = false;
  @Input() existingProductIds: number[] = [];
  @Output() close = new EventEmitter<void>();
  @Output() add = new EventEmitter<Product>();

  products: Product[] = [];

  ngOnInit() {
    this.productService.getAllProducts().subscribe({
      next: products => (this.products = products),
      error: err => console.error('Error fetching products:', err),
    });
  }

  isAlreadyAdded(id: number): boolean {
    return this.existingProductIds.includes(id);
  }

  onAdd(product: Product): void {
    this.add.emit(product);
    this.close.emit();
  }
}
