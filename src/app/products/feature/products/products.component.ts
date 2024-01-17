import { Component, inject } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent {
  private productsService = inject(ProductsService);
  private router = inject(Router);
  
  $products = this.productsService.getProducts();

  showDetails(id: string): void {
    this.router.navigate(['product', id]);
  }
}
