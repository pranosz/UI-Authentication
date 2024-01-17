import { Routes } from "@angular/router";
import { ProductsComponent } from "./feature/products/products.component";
import { ProductComponent } from "./feature/product/product.component";
import { AuthGuard } from "../common/guards/auth-guard";

export const routes: Routes = [
    {
      path: 'products',
      component: ProductsComponent,
      canActivate: [AuthGuard],
    },
    {
      path: 'product/:id',
      component: ProductComponent
    }
  ];