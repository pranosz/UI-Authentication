import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private url = 'http://localhost:3500';
  private httpClient = inject(HttpClient);

  getProducts(): Observable<Product[]> {
    return this.httpClient.get<Product[]>(`${this.url}/products`);
  }
  
  getProduct(id: string): Observable<Product> {
    return this.httpClient.get<Product>(`${this.url}/products/${id}`);
  }

}
