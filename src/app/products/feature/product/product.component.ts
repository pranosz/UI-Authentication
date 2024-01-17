import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { of, switchMap } from 'rxjs';
import { Product } from '../../models/product';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  private route = inject(ActivatedRoute);
  private productsService = inject(ProductsService);
  product: Product | null = null;

  ngOnInit(): void {
    this.route.paramMap.pipe(
      switchMap( params => {
        const id = params.get('id');
        return id ? this.productsService.getProduct(id) : of(null);  
      })
    ).subscribe(product => this.product = product);
  }

}
