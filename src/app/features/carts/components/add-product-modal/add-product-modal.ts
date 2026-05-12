import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '../../../products/models/product.model';

const AVAILABLE_PRODUCTS: Product[] = [
  { id: 1, name: 'Laptop Dell XPS 15', code: 'SKU-001', price: 1299.99 },
  { id: 2, name: 'Mouse Logitech MX Master 3', code: 'SKU-002', price: 89.99 },
  { id: 3, name: 'Teclado Mecanico Keychron K2', code: 'SKU-003', price: 119.99 },
  { id: 4, name: 'Monitor 4K LG 27"', code: 'SKU-004', price: 449.99 },
  { id: 5, name: 'Auriculares Sony WH-1000XM5', code: 'SKU-005', price: 349.99 },
  { id: 6, name: 'Webcam Logitech C920', code: 'SKU-006', price: 79.99 },
  { id: 7, name: 'SSD Samsung 1TB', code: 'SKU-007', price: 129.99 },
  { id: 8, name: 'Hub USB-C Anker 7-en-1', code: 'SKU-008', price: 49.99 },
];

@Component({
  selector: 'app-add-product-modal',
  imports: [CommonModule],
  templateUrl: './add-product-modal.html',
})
export class AddProductModal {
  @Input() show = false;
  @Input() existingProductIds: number[] = [];
  @Output() close = new EventEmitter<void>();
  @Output() add = new EventEmitter<Product>();

  products = AVAILABLE_PRODUCTS;

  isAlreadyAdded(id: number): boolean {
    return this.existingProductIds.includes(id);
  }

  onAdd(product: Product): void {
    this.add.emit(product);
    this.close.emit();
  }
}
