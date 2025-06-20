import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core'; 
import { Product } from '../../models/Product';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-robe',
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './robe.component.html',
  styleUrls: ['./robe.component.css']
})
export class RobeComponent implements OnInit {
  @Input() selectedProduct: Product | null = null;
  @Output() productSelected = new EventEmitter<Product>();

  products: Product[] = [];
  filteredProducts: Product[] = [];
  hovered: number | null = null;
  searchTerm: string = '';
  currentRating: number = 0;

  wishlist: Product[] = [];  // <--- هادي المفضلة

  apiUrl = 'http://localhost:3000/api/robes';

  constructor(private http: HttpClient, private router: Router , private cartService: CartService) {}

  ngOnInit(): void {
    this.http.get<Product[]>(this.apiUrl).subscribe({
      next: (data) => {
        this.products = data;
        this.filteredProducts = this.products.filter(p => p.quantity > 0);
      },
      error: (err) => {
        console.error('Erreur lors de la récupération des produits', err);
      }
    });

    // جلب wishlist من localStorage
    const storedWishlist = localStorage.getItem('wishlist');
    if (storedWishlist) {
      this.wishlist = JSON.parse(storedWishlist);
    }
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
    this.currentRating = star;
  }

  goToProductDetails(productId: number): void {
    this.router.navigate(['/products', productId]);
  }

  addToCart(product: Product): void {
    this.cartService.addItem(product);
    alert(`Le produit ${product.productTitle} a été ajouté au panier !`);
  }

  search() {
    const term = this.searchTerm.toLowerCase().trim();
    this.filteredProducts = this.products.filter(p => 
      p.quantity > 0 && p.productTitle.toLowerCase().includes(term)
    );
  }

  // ------------- Wishlist functions --------------

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
