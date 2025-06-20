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
  imports: [CommonModule, RouterModule]
})
export class ColliersPerlesComponent implements OnInit {
  products: Product[] = [];
  wishlist: Product[] = [];   
  currentRating: number = 0;
  hovered: number | null = null;

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit() {
    this.http.get<Product[]>('http://localhost:3000/api/products?type=perles').subscribe({
      next: (data) => this.products = data,
      error: (err) => console.error(err)
    });

   
    const storedWishlist = localStorage.getItem('wishlist');
    if (storedWishlist) {
      this.wishlist = JSON.parse(storedWishlist);
    }
  }

  rateProduct(star: number, product: Product): void {
    product.rating = star;
    this.currentRating = star;
  }

  goToProductDetails(productId: number): void {
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


  toggleWishlist(product: Product): void {
    const index = this.wishlist.findIndex(p => p.productId === product.productId);
    if (index !== -1) {
      this.wishlist.splice(index, 1);
    } else {
      this.wishlist.push(product); 
    }
    localStorage.setItem('wishlist', JSON.stringify(this.wishlist));
  }

  
  isInWishlist(product: Product): boolean {
    return this.wishlist.some(p => p.productId === product.productId);
  }
}
