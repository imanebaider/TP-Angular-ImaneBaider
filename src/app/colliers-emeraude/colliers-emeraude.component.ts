import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Product } from '../../models/Product';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-colliers-emeraude',
  templateUrl: './colliers-emeraude.component.html',
  styleUrls: ['./colliers-emeraude.component.css'],
  imports: [CommonModule,FormsModule,RouterModule]
})
export class ColliersEmeraudeComponent implements OnInit {
  products: Product[] = [];
  currentRating: number = 0;
  hovered: number | null = null;
  searchTerm: string = '';
filteredProducts: Product[] = [];

  constructor(private http: HttpClient, private router: Router) {}

  
 ngOnInit(): void {
  const typeEncoded = encodeURIComponent('émeraude');
  const url = `http://localhost:3000/api/products?type=${typeEncoded}`;

  this.http.get<Product[]>(url).subscribe({
    next: (data) => {
      this.products = data;
      this.filteredProducts = this.products.filter(p => p.quantity > 0);
    },
    error: (err) => {
      console.error('Erreur lors de la récupération des produits', err);
    }
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

  search() {
  const term = this.searchTerm.toLowerCase().trim();

  this.filteredProducts = this.products.filter(p => 
    p.quantity > 0 && p.productTitle.toLowerCase().includes(term)
  );
}
}
