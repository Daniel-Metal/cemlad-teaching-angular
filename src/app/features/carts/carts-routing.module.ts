import { Routes } from '@angular/router';
import { ShowCarts } from './pages/show-carts/show-carts';
import { CartDetail } from './pages/cart-detail/cart-detail';

export const cartsRoutes: Routes = [
  { path: '', component: ShowCarts },
  { path: ':id', component: CartDetail },
];
