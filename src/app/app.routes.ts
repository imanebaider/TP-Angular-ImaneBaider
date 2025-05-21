// app.routes.ts
import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { CatalogComponentComponent } from './catalog-component/catalog-component.component';
import { ProductDetailsComponent } from './product-details/product-details.component';



export const routes: Routes = [
  { 
    path: '', 
    loadComponent: () => import('./catalog-component/catalog-component.component').then(m => m.CatalogComponentComponent) 
  },
  { 
    path: 'login', 
    loadComponent: () => import('./login/login.component').then(m => m.LoginComponent) 
  },
  { 
    path: 'product/:id', 
    loadComponent: () => import('./product-details/product-details.component').then(m => m.ProductDetailsComponent) 
  },
  { path: '**', redirectTo: '' }
];
