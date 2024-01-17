import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsComponent } from './feature/products/products.component';
import { ProductComponent } from './feature/product/product.component';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { routes } from './products.routes';
import { ProductsListComponent } from './ui/products-list/products-list.component';

@NgModule({
  declarations: [
    ProductsComponent,
    ProductComponent,
    ProductsListComponent
  ],
  imports: [
    CommonModule,
    MatCardModule,
    MatGridListModule,
    MatIconModule,
    MatListModule,
    RouterModule.forChild(routes)
  ]
})
export class ProductsModule { }
