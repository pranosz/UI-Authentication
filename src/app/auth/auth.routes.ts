import { Routes } from "@angular/router";
import { LoginComponent } from "./login/login.component";
import { RegistryComponent } from "./registry/registry.component";

export const routes: Routes = [
    {
      path: '',
      redirectTo: 'login',
      pathMatch: 'full'
    },
    {
      path: 'login',
      component: LoginComponent 
    },
    {
      path: 'registry',
      component: RegistryComponent
    }
  ];

