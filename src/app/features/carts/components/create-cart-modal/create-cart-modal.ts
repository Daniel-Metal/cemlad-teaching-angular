import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-create-cart-modal',
  imports: [CommonModule, FormsModule],
  templateUrl: './create-cart-modal.html',
})
export class CreateCartModal {
  @Input() show = false;
  @Output() close = new EventEmitter<void>();
  @Output() created = new EventEmitter<number>();

  customerId: number | null = null;

  onCreate(): void {
    if (this.customerId) {
      this.created.emit(this.customerId);
      this.customerId = null;
    }
  }

  onClose(): void {
    this.customerId = null;
    this.close.emit();
  }
}
