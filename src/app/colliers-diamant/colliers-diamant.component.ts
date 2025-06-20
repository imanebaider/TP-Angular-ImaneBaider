import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Product } from '../../models/Product';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-colliers-diamant',
  templateUrl: './colliers-diamant.component.html',
  styleUrls: ['./colliers-diamant.component.css'],
  imports: [CommonModule, FormsModule, RouterModule]
})
export class ColliersDiamantComponent implements OnInit {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  wishlist: Product[] = []; // ajout de la wishlist
  currentRating: number = 0;
  hovered: number | null = null;
  searchTerm: string = '';

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.http.get<Product[]>('http://localhost:3000/api/products?type=diamant').subscribe({
      next: (data) => {
        this.products = data;
        this.filteredProducts = this.products.filter(p => p.quantity > 0);
      },
      error: (err) => {
        console.error('Erreur lors de la récupération des produits', err);
      }
    });

    //  Charger la wishlist depuis localStorage
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

  search() {
    const term = this.searchTerm.toLowerCase().trim();
    this.filteredProducts = this.products.filter(p =>
      p.quantity > 0 && p.productTitle.toLowerCase().includes(term)
    );
  }


  toggleWishlist(product: Product): void {
    const index = this.wishlist.findIndex(p => p.productId === product.productId);
    if (index !== -1) {
      this.wishlist.splice(index, 1); // supprimer
    } else {
      this.wishlist.push(product); // ajouter
    }
    localStorage.setItem('wishlist', JSON.stringify(this.wishlist));
  }

  
  isInWishlist(product: Product): boolean {
    return this.wishlist.some(p => p.productId === product.productId);
  }
}
