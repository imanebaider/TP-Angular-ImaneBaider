import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Product } from '../../models/Product';
import { CommonModule } from '@angular/common';
import { CartService } from '../services/cart.service';


@Component({
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  product!: Product;
  selectedImage: string = '';
  type: string = '';

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.type = this.route.snapshot.paramMap.get('type') ?? 'products'; // fallback

    console.log('Type:', this.type);
    console.log('ID:', id);

    this.http.get<Product>(`http://localhost:3000/api/${this.type}/${id}`).subscribe({
      next: (data) => {
        this.product = data;
        this.selectedImage = data.imageUrl[0]; 
      },
      error: (err) => {
        console.error('Erreur lors de la récupération du produit:', err);
        this.router.navigate(['/not-found']); // rediriger vers 404 si produit non trouvé
      }
    });
  }

  selectImage(img: string): void {
    this.selectedImage = img;
  }

  addToCart(product: Product): void {
    this.cartService.addItem(product);
    alert(`✅ Le produit"${product.productTitle}" a bien été ajouté au panier`);
  }
}

