import { Routes } from '@angular/router';
import { ShowProducts } from './pages/show-products/show-products';
import { CreateEdit } from './pages/create-edit/create-edit';

export const productsRoutes: Routes = [
  { path: '', component: ShowProducts },
  { path: 'create', component: CreateEdit },
  { path: ':id/edit', component: CreateEdit },
];
