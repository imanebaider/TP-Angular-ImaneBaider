import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Product } from '../models/Product';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ProductDetailsComponent } from '../product-details/product-details.component';

@Component({
  selector: 'app-catalog-component',
  standalone: true,
  imports: [FormsModule, CommonModule, ProductDetailsComponent],
  templateUrl: './catalog-component.component.html',
  styleUrls: ['./catalog-component.component.css']
})
export class CatalogComponentComponent implements OnInit {
  @Input() selectedProduct: Product | null = null;
  @Output() productSelected = new EventEmitter<Product>();
  products: Product[] = [];

  apiUrl = 'http://localhost:3000/api/products'; //API 

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get<Product[]>(this.apiUrl).subscribe({
      next: (data) => {
        this.products = data;
      },
      error: (err) => {
        console.error('Erreur lors de la récupération des produits', err);
      }
    });
  }

  get availableProducts(): Product[] {
    return this.products.filter(p => p.quantity > 0);
  }
  
  selectProduct(product: Product) {
    this.productSelected.emit(product);
  }
}
