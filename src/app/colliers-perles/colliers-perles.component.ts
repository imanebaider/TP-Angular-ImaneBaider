import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Product } from '../../models/Product';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-colliers-perles',
  templateUrl: './colliers-perles.component.html',
  styleUrls: ['./colliers-perles.component.css'],
  imports: [CommonModule,RouterModule]
})
export class ColliersPerlesComponent implements OnInit {
  products: Product[] = [];   
  currentRating: number = 0;
  hovered: number | null = null;

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit() {
    this.http.get<Product[]>('http://localhost:3000/api/products?type=perles').subscribe({
      next: (data) => this.products = data,
      error: (err) => console.error(err)
    });
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

  addToCart(product: Product): void {
    console.log(`Added product ${product.productTitle} to cart.`);
  }

  onMouseEnter(productId: number): void {
    this.hovered = productId;
  }

  onMouseLeave(): void {
    this.hovered = null;
  }
}
