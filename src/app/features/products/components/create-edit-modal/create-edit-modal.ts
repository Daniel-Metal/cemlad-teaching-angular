import { Component, Input, Output, EventEmitter, OnChanges, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Product } from '../../models/product.model';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-create-edit-modal',
  imports: [CommonModule, FormsModule],
  templateUrl: './create-edit-modal.html',
  styleUrl: './create-edit-modal.css',
})
export class CreateEditModal implements OnChanges {
  productService = inject(ProductService);

  @Input() show = false;
  @Input() product: Product | null = null;
  @Output() close = new EventEmitter<void>();

  formName = '';
  formCode = '';
  formPrice: number | null = null;

  get isEdit(): boolean {
    return this.product !== null;
  }

  ngOnChanges(): void {
    if (this.product) {
      this.formName = this.product.name;
      this.formCode = this.product.code;
      this.formPrice = this.product.price;
    } else {
      this.formName = '';
      this.formCode = '';
      this.formPrice = null;
    }
  }

  onClose(): void {
    this.close.emit();
  }

  onSubmit(): void {
    console.log(this.product);

    if (this.product) {
      this.product.name = this.formName;
      this.product.code = this.formCode;
      this.product.price = this.formPrice ?? 0;

      this.productService.updateProduct(this.product).subscribe({
        next: () => this.clearForm(),
        error: err => console.error('Error updating product:', err)
      });
    } else {
      console.log("Creating product with data:", {
        name: this.formName,
        code: this.formCode,
        price: this.formPrice,
      });

      this.productService.createProduct({
        name: this.formName,
        code: this.formCode,
        price: this.formPrice ?? 0,
      }).subscribe({
        next: () => this.clearForm(),
        error: err => console.error('Error creating product:', err)
      });
    }
  }

  clearForm(): void {
    this.formName = '';
    this.formCode = '';
    this.formPrice = null;

    this.onClose();
  }
}
