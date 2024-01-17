import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from '../../models/product';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss']
})
export class ProductsListComponent {

  @Input() products!: Observable<Product[]>;
  @Output() onShowDetails = new EventEmitter<string>();

  showInfo(id: string): void {
    this.onShowDetails.emit(id);
  }
}
