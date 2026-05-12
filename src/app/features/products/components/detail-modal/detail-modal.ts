import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-detail-modal',
  imports: [CommonModule],
  templateUrl: './detail-modal.html',
  styleUrl: './detail-modal.css',
})
export class DetailModal {
  @Input() show = false;
  @Input() product: Product | null = null;
  @Output() close = new EventEmitter<void>();
}
