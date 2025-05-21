import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
// ✅ صحيح
import { CatalogComponentComponent } from "./catalog-component/catalog-component.component";
import { Product } from '../models/Product';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    CatalogComponentComponent
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'] // <-- هنا s في الأخير
})

export class AppComponent {
  title = 'tp4';
  selectedProduct: Product | null = null;
  
  onProductSelected(product: Product) {
    this.selectedProduct = this.selectedProduct === product ? null : product;
  }
}

