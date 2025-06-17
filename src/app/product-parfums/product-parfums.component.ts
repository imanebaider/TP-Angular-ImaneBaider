import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Product } from '../../models/Product';
import { CommonModule } from '@angular/common';
import { CartService } from '../services/cart.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-product-parfums',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './product-parfums.component.html',
  styleUrls: ['./product-parfums.component.css']
})
export class ProductParfumsComponent implements OnInit {
  product!: Product;
  selectedImage: string = '';

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if (!id) {
      this.router.navigate(['/not-found']);
      return;
    }

    const parsedId = parseInt(id);

    this.http.get<Product>(`http://localhost:3000/api/parfums/${parsedId}`).subscribe({
      next: (data) => {
        this.product = data;
        this.selectedImage = data.imageUrl[0];
      },
      error: (err) => {
        console.error('Erreur lors de la récupération du produit:', err);
        this.router.navigate(['/not-found']);
      }
    });
  }

  selectImage(img: string): void {
    this.selectedImage = img;
  }

  addToCart(product: Product): void {
    this.cartService.addItem(product);
    alert(`✅ Le produit "${product.productTitle}" a bien été ajouté au panier`);
  }
}
