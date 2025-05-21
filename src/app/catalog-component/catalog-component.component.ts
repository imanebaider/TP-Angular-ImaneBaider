import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core'; 
import { Product } from '../../models/Product';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-catalog-component',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './catalog-component.component.html',
  styleUrls: ['./catalog-component.component.css']
})



export class CatalogComponentComponent implements OnInit {
  @Input() selectedProduct: Product | null = null;
  @Output() productSelected = new EventEmitter<Product>();

  products: Product[] = [];
  hovered: number | null = null;
  apiUrl = 'http://localhost:3000/api/products'; //API

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

  currentRating: number = 0;  // المتغير لتخزين التقييم الحالي

  // دالة لتحديث التقييم
  rateProduct(star: number, product: Product): void {
    product.rating = star;  // تعيين التقييم
    console.log(`Product ${product.productTitle} rated: ${star}`);
    this.currentRating = star; // حفظ التقييم الحالي
  }
goToProductDetails(productId: number): void {
  this.router.navigate(['/product', productId]); // ✅ سيتم التوجيه عبر الـ Router
}
}
