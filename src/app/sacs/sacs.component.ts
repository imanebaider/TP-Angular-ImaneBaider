
import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core'; 
import { Product } from '../../models/Product';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { CartService } from '../services/cart.service';


@Component({
  selector: 'app-sacs',
  imports:  [FormsModule, CommonModule, RouterModule],
  templateUrl: './sacs.component.html',
  styleUrl: './sacs.component.css'
})


export class SacsComponent  implements OnInit {
  @Input() selectedProduct: Product | null = null;
  @Output() productSelected = new EventEmitter<Product>();

  products: Product[] = [];
  hovered: number | null = null;
  searchTerm: string = '';
filteredProducts: Product[] = [];

  apiUrl = 'http://localhost:3000/api/sacs';


  currentRating: number = 0;

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

 goToDetail(id: number): void {
  this.router.navigate(['/sacs', id]);
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


}








