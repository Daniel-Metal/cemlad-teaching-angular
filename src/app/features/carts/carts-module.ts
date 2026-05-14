import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { cartsRoutes } from './carts-routing.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(cartsRoutes),
  ],
  exports: [RouterModule],
})
export class CartsModule {}

