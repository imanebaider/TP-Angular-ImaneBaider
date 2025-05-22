import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core'; 
import { Product } from '../../models/Product';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-catalog-component',
  standalone: true,
imports: [FormsModule, CommonModule, RouterModule], //tres imprtant 
  templateUrl: './catalog-component.component.html',
  styleUrls: ['./catalog-component.component.css']
})
export class CatalogComponentComponent implements OnInit {
  @Input() selectedProduct: Product | null = null;
  @Output() productSelected = new EventEmitter<Product>();

  products: Product[] = [];
  hovered: number | null = null;
  apiUrl = 'http://localhost:3000/api/products';

  currentRating: number = 0;

constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.http.get<Product[]>(this.apiUrl).subscribe({
      next: (data) => {
        this.products = data;
      },
      error: (err) => {
        console.error('Erreur lors de la récupération des produits', err);
      }
    });
  }

  get availableProducts(): Product[] {
    return this.products.filter(p => p.quantity > 0);
  }

  onMouseEnter(productId: number) {
    this.hovered = productId;
  }

  onMouseLeave() {
    this.hovered = null;
  }

  selectProduct(product: Product) {
    this.selectedProduct = this.selectedProduct === product ? null : product;
  }

  rateProduct(star: number, product: Product): void {
    product.rating = star;
    console.log(`Product ${product.productTitle} rated: ${star}`);
    this.currentRating = star;
  }

 goToProductDetails(productId: number): void {
  console.log('Clicked on product', productId);
  this.router.navigate(['/products', productId]);
}




}
