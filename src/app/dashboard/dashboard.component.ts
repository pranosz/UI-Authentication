import { Component, inject } from '@angular/core';
import { ProductsService } from './services/products.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

  private productsService = inject(ProductsService);
  
  $products = this.productsService.getProducts();

  showInfo(id: string): void {
    console.log("id ", id);
  }

}
