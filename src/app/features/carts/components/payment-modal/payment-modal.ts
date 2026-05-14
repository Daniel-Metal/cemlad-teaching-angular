import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Cart } from '../../models/cart.model';
import { PaymentMethod } from '../../enums/cart.enum';

@Component({
  selector: 'app-payment-modal',
  imports: [CommonModule],
  templateUrl: './payment-modal.html',
})
export class PaymentModal {
  @Input() show = false;
  @Input() cart: Cart | undefined = undefined;
  @Output() close = new EventEmitter<void>();
  @Output() paid = new EventEmitter<PaymentMethod>();

  selectedMethod: PaymentMethod | null = null;

  selectMethod(method: PaymentMethod): void {
    this.selectedMethod = method;
  }

  onPay(): void {
    if (this.selectedMethod) {
      this.paid.emit(this.selectedMethod);
      this.selectedMethod = null;
    }
  }

  onClose(): void {
    this.selectedMethod = null;
    this.close.emit();
  }
}
