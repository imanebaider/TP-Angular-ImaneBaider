import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';
import { Product } from '../../models/Product';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule],  // مهم تدخل CommonModule هنا
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartItems: Product[] = [];
  products: Product[] = [];  

  constructor(private cartService: CartService,private http: HttpClient, private router: Router) {}

  ngOnInit() {
    this.cartItems = this.cartService.getItems();
  }

  clearCart() {
    this.cartService.clearCart();
    this.cartItems = [];
  }
  
  
  goToProductDetails(productId: number): void {
    console.log('Clicked on product', productId);
    this.router.navigate(['/products', productId]);
  }



}
