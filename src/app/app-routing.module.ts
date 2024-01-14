import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegistryComponent } from './auth/registry/registry.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from './auth/services/guards/auth-guard';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent 
  },
  {
    path: 'registry',
    component: RegistryComponent
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
