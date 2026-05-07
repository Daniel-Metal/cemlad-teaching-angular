import { Component } from '@angular/core';
import { DetailModal } from '../../components/detail-modal/detail-modal';

@Component({
  selector: 'app-show-products',
  imports: [DetailModal],
  templateUrl: './show-products.html',
  styleUrl: './show-products.css',
})
export class ShowProducts {}
