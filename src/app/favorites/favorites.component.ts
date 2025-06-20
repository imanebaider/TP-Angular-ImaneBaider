import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/Product';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-favorites',
   standalone: true, 
  imports: [CommonModule, RouterModule],
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent implements OnInit {

  wishlist: Product[] = [];

  constructor(private router: Router) {}

  ngOnInit(): void {
    const storedWishlist = localStorage.getItem('wishlist');
    if (storedWishlist) {
      this.wishlist = JSON.parse(storedWishlist);
    }
  }

  goToProductDetails(productId: number): void {
    this.router.navigate(['/products', productId]);
  }

  removeFromWishlist(product: Product): void {
    this.wishlist = this.wishlist.filter(p => p.productId !== product.productId);
    localStorage.setItem('wishlist', JSON.stringify(this.wishlist));
  }

}
