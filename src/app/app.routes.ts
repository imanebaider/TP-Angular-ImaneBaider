import { Routes } from '@angular/router';
import { CatalogComponentComponent } from './catalog-component/catalog-component.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { LoginComponent } from './login/login.component';
import { ColliersPerlesComponent } from './colliers-perles/colliers-perles.component';
import { ColliersEmeraudeComponent } from './colliers-emeraude/colliers-emeraude.component';
import { ColliersOrComponent } from './colliers-or/colliers-or.component'; 
import { CartComponent } from './cart/cart.component';
import { ColliersDiamantComponent } from './colliers-diamant/colliers-diamant.component'; 



export const routes: Routes = [
  { path: '', component: CatalogComponentComponent },
  { path: 'login', component: LoginComponent },
  { path: 'products/:id', component: ProductDetailsComponent },
  { path: 'colliers-perles', component: ColliersPerlesComponent },
  { path: 'colliers-émeraude', component: ColliersEmeraudeComponent },
   { path: 'colliers-or', component: ColliersOrComponent },
    { path: 'colliers-diamant', component: ColliersDiamantComponent },
   { path: 'cart', component: CartComponent },
  { path: '**', redirectTo: '' }
];
