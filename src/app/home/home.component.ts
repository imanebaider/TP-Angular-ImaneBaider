import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Component, Input, Output, EventEmitter, ViewChild, ElementRef, AfterViewInit } from '@angular/core'; 
import { Product } from '../../models/Product';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements AfterViewInit {
  @ViewChild('homeContainer', { static: false }) homeContainer!: ElementRef<HTMLDivElement>;

  images = [
    { url: 'http://localhost:3000/assets/images/marque1.jpg', name: 'Marque 1', badge: 'New' },
    { url: 'http://localhost:3000/assets/images/marque2.jpg', name: 'Marque 2' },
    { url: 'http://localhost:3000/assets/images/marque3.jpg', name: 'Marque 3', badge: 'Top' },
    { url: 'http://localhost:3000/assets/images/marque4.jpg', name: 'Marque 4' },
    { url: 'http://localhost:3000/assets/images/marque5.jpg', name: 'Marque 4' },
    { url: 'http://localhost:3000/assets/images/marque6.jpg', name: 'Marque 4' },
    { url: 'http://localhost:3000/assets/images/marque7.jpg', name: 'Marque 4' },
    { url: 'http://localhost:3000/assets/images/marque8.jpg', name: 'Marque 4' },
    { url: 'http://localhost:3000/assets/images/marque9.jpg', name: 'Marque 4' },
    { url: 'http://localhost:3000/assets/images/marque10.jpg', name: 'Marque 4' },
     { url: 'http://localhost:3000/assets/images/marque11.jpg', name: 'Marque 4' },
      { url: 'http://localhost:3000/assets/images/marque12.jpg', name: 'Marque 4' },
       { url: 'http://localhost:3000/assets/images/marque13.jpg', name: 'Marque 4' },
  ];

  @Input() selectedProduct: Product | null = null;
  @Output() productSelected = new EventEmitter<Product>();

  products: Product[] = [];
  hovered: number | null = null;
  searchTerm: string = '';
  filteredProducts: Product[] = [];

  apiUrl = 'http://localhost:3000/api/products';

  imageUrl: string = 'assets/images/background-bijoux.jpg';

  cardWidth = 220; 
  scrollPosition = 0;

  ngAfterViewInit() {
    if (typeof window !== 'undefined') {
      this.startAutoScroll();
    }
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

        if (typeof container.scrollTo === 'function') {
          container.scrollTo({
            left: this.scrollPosition,
            behavior: 'smooth'
          });
        } else {
          container.scrollLeft = this.scrollPosition;
        }
      }
    }, 1500);
  }


  search() {
  const term = this.searchTerm.toLowerCase().trim();

  this.filteredProducts = this.products.filter(p => 
    p.quantity > 0 && p.productTitle.toLowerCase().includes(term)
  );
}









}
