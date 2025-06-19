import { Component, Input, Output, EventEmitter, ViewChild, ElementRef, OnInit, AfterViewInit } from '@angular/core'; 
import { Product } from '../../models/Product';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-sacs',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './sacs.component.html',
  styleUrls: ['./sacs.component.css']  // <- corrected (was styleUrl)
})
export class SacsComponent implements OnInit, AfterViewInit {
  @Input() selectedProduct: Product | null = null;
  @Output() productSelected = new EventEmitter<Product>();

  products: Product[] = [];
  filteredProducts: Product[] = [];
  hovered: number | null = null;
  searchTerm: string = '';
  currentRating: number = 0;

  apiUrl = 'http://localhost:3000/api/sacs';

  constructor(
    private http: HttpClient,
    private router: Router,
    private cartService: CartService
  ) {}

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

  @ViewChild('homeContainer', { static: false }) homeContainer!: ElementRef<HTMLDivElement>;

  images = [
    { url: 'http://localhost:3000/assets/images/sacloraya1.jpg',   badge: 'New' },
    { url: 'http://localhost:3000/assets/images/sacloraya2.jpg', },
    { url: 'http://localhost:3000/assets/images/sacloraya3.jpg', badge: 'Top' },
    { url: 'http://localhost:3000/assets/images/sacloraya4.jpg',   },
    { url: 'http://localhost:3000/assets/images/sacloraya5.jpg',   },
    { url: 'http://localhost:3000/assets/images/sacloraya6.jpg',  },
    { url: 'http://localhost:3000/assets/images/sacloraya7.jpg',   },
    { url: 'http://localhost:3000/assets/images/sacloraya8.jpg', },
    { url: 'http://localhost:3000/assets/images/sacloraya9.jpg',   },
    { url: 'http://localhost:3000/assets/images/sacloraya10.jpg', },
     { url: 'http://localhost:3000/assets/images/sacloraya11.jpg', },
  
  
  ];

  cardWidth = 220;
  scrollPosition = 0;

  ngAfterViewInit(): void {
    this.startAutoScroll();
  }

  startAutoScroll() {
    setInterval(() => {
      if (this.homeContainer) {
        const container = this.homeContainer.nativeElement;
        this.scrollPosition += this.cardWidth;

        const maxScrollLeft = container.scrollWidth - container.clientWidth;
        if (this.scrollPosition > maxScrollLeft) {
          this.scrollPosition = 0;
        }

        container.scrollTo({
          left: this.scrollPosition,
          behavior: 'smooth'
        });
      }
    }, 1500);
  }
}
