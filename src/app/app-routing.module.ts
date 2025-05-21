import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('../catalog-component/catalog-component.component').then(m => m.CatalogComponentComponent)
  },
  {
   path: 'product/:id',
    loadComponent: () => import('../product-details/product-details.component').then(m => m.ProductDetailsComponent) // ✅ تأكد من المسار الصحيح
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
