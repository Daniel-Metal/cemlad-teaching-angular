import { Component, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-create-edit-modal',
  imports: [CommonModule, FormsModule],
  templateUrl: './create-edit-modal.html',
  styleUrl: './create-edit-modal.css',
})
export class CreateEditModal implements OnChanges {
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
}
