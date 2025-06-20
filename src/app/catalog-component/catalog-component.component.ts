import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core'; 
import { Product } from '../../models/Product';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-catalog-component',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './catalog-component.component.html',
  styleUrls: ['./catalog-component.component.css']
})
export class CatalogComponentComponent implements OnInit {

  @Input() selectedProduct: Product | null = null;
  @Output() productSelected = new EventEmitter<Product>();

  products: Product[] = [];
  filteredProducts: Product[] = [];
  wishlist: Product[] = []; // ajout wishlist

  hovered: number | null = null;
  searchTerm: string = '';
  apiUrl = 'http://localhost:3000/api/products';

  currentRating: number = 0;
  selectedImage: string = '';
  isModalOpen: boolean = false;
  modalProduct: Product | null = null;

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

    // charger les favoris du localStorage
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

  addToCart(product: Product | null): void {
    if (product) {
      this.cartService.addItem(product);
      alert(`le produit est ajouté${product.productTitle} au panier`);
      this.closeModal();  
    }
  }

  search() {
    const term = this.searchTerm.toLowerCase().trim();
    this.filteredProducts = this.products.filter(p => 
      p.quantity > 0 && p.productTitle.toLowerCase().includes(term)
    );
  }

  openModal(product: Product) {
    this.modalProduct = product;
    this.selectedImage = product.imageUrl[0]; // première image
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
    this.modalProduct = null;
  }

  selectImage(img: string): void {
    this.selectedImage = img;
  }

  //  Ajouter ou retirer de la wishlist
  toggleWishlist(product: Product): void {
    const index = this.wishlist.findIndex(p => p.productId === product.productId);
    if (index !== -1) {
      this.wishlist.splice(index, 1);
    } else {
      this.wishlist.push(product);
    }
    localStorage.setItem('wishlist', JSON.stringify(this.wishlist));
  }

  // Vérifier si un produit est dans la wishlist
  isInWishlist(product: Product): boolean {
    return this.wishlist.some(p => p.productId === product.productId);
  }
}
