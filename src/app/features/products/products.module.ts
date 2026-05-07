import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { productsRoutes } from './products-routing.module';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild(productsRoutes),
    CommonModule,
  ],
  exports: [RouterModule],
  declarations: [],
})
export class ProductsModule {
}
