

import { Component, Input, Output, EventEmitter, ViewChild, ElementRef, OnInit, AfterViewInit } from '@angular/core'; 

import { Product } from '../../models/Product';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { CartService } from '../services/cart.service';



@Component({
  selector: 'app-parfums',
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './parfums.component.html',
  styleUrl: './parfums.component.css'
})
export class ParfumsComponent  implements OnInit {
  @Input() selectedProduct: Product | null = null;
  @Output() productSelected = new EventEmitter<Product>();

  products: Product[] = [];
  hovered: number | null = null;
  searchTerm: string = '';
filteredProducts: Product[] = [];

  apiUrl = 'http://localhost:3000/api/parfums';

selectedImage: string = '';

  isModalOpen: boolean = false;
  modalProduct: Product | null = null;
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
goToProductDetails(productId: number): void {
  console.log('Clicked on product', productId);
  this.router.navigate(['/parfums', productId]); // ✅ dirna "parfums" f l lien
}



   addToCart(product: Product | null): void {
    if (product) {
  this.cartService.addItem(product);
  alert(`Le produit ${product.productTitle} a été ajouté au panier !`);
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


  
  @ViewChild('homeContainer', { static: false }) homeContainer!: ElementRef<HTMLDivElement>;

  images = [
    { url: 'http://localhost:3000/assets/images/para1.jpg',   badge: 'New' },
    { url: 'http://localhost:3000/assets/images/para2.jpg', },
    { url: 'http://localhost:3000/assets/images/para3.jpg', badge: 'Top' },
    { url: 'http://localhost:3000/assets/images/para4.jpg',   },
    { url: 'http://localhost:3000/assets/images/para5.jpg',   },
    { url: 'http://localhost:3000/assets/images/para6.jpg',  },
    { url: 'http://localhost:3000/assets/images/para7.jpg',   },
    { url: 'http://localhost:3000/assets/images/para8.jpg', },
    { url: 'http://localhost:3000/assets/images/para9.jpg',   },
    { url: 'http://localhost:3000/assets/images/para10.jpg', },
     { url: 'http://localhost:3000/assets/images/para11.jpg', },
  
  
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










