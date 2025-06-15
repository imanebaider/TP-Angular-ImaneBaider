import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
 import { ReactiveFormsModule } from '@angular/forms';
import { CatalogComponentComponent } from "./catalog-component/catalog-component.component";
import { Product } from '../models/Product';



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'tp4';
  selectedProduct: Product | null = null;  // خاصك تستورد Product إلا بغيتي تستعملها

  // الوظيفة باش تختار أو تلغي اختيار منتج
  onProductSelected(product: Product) {
    this.selectedProduct = this.selectedProduct === product ? null : product;
  }
}

