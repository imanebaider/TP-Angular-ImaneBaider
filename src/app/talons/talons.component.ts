import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core'; 
import { Product } from '../../models/Product';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-talons',
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './talons.component.html',
  styleUrl: './talons.component.css'
})
export class TalonsComponent implements OnInit {
  @Input() selectedProduct: Product | null = null;
  @Output() productSelected = new EventEmitter<Product>();

  products: Product[] = [];
  filteredProducts: Product[] = [];
  wishlist: Product[] = [];
  hovered: number | null = null;
  searchTerm: string = '';
  currentRating: number = 0;

  apiUrl = 'http://localhost:3000/api/talons';

  constructor(
    private http: HttpClient,
    private router: Router,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    // Charger les produits
    this.http.get<Product[]>(this.apiUrl).subscribe({
      next: (data) => {
        this.products = data;
        this.filteredProducts = this.products.filter(p => p.quantity > 0);
      },
      error: (err) => {
        console.error('Erreur lors de la récupération des produits', err);
      }
    });

    // Charger la wishlist depuis le localStorage
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
    console.log(`Product ${product.productTitle} rated: ${star}`);
    this.currentRating = star;
  }

  goToProductDetails(productId: number): void {
    console.log('Clicked on product', productId);
    this.router.navigate(['/products', productId]);
  }

  addToCart(product: Product): void {
    this.cartService.addItem(product);
    alert(`Le produit ${product.productTitle} a été ajouté au panier !`);
  }

  search(): void {
    const term = this.searchTerm.toLowerCase().trim();
    this.filteredProducts = this.products.filter(p => 
      p.quantity > 0 && p.productTitle.toLowerCase().includes(term)
    );
  }

  // Ajouter ou supprimer produit de wishlist
  toggleWishlist(product: Product): void {
    const index = this.wishlist.findIndex(p => p.productId === product.productId);
    if (index !== -1) {
      this.wishlist.splice(index, 1); // supprimer
    } else {
      this.wishlist.push(product); // ajouter
    }

    // Sauvegarder dans le localStorage
    localStorage.setItem('wishlist', JSON.stringify(this.wishlist));
  }

  // Vérifie si un produit est dans la wishlist
  isInWishlist(product: Product): boolean {
    return this.wishlist.some(p => p.productId === product.productId);
  }
}
