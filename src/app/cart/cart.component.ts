import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';
import { Product } from '../../models/Product';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
   currentStep = 1;
  cartItems: Product[] = [];

  constructor(
    private cartService: CartService,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit() {
    this.cartItems = this.cartService.getItems();

    // تأكد من quantity و selected
    this.cartItems.forEach(item => {
      if (!item.quantity || item.quantity < 1) {
        item.quantity = 1;
      }
      if (item.selected === undefined) {
        item.selected = true; // كل عنصر مختار افتراضيًا
      }
    });
  }

  onQuantityChange(product: Product) {
    if (product.quantity < 1) {
      product.quantity = 1;
    }
    this.cartService.updateCart(this.cartItems);
  }

  clearCart() {
    this.cartService.clearCart();
    this.cartItems = [];
  }

  removeItem(productToRemove: Product): void {
    this.cartItems = this.cartItems.filter(p => p.productId !== productToRemove.productId);
    this.cartService.updateCart(this.cartItems);
  }

  goToProductDetails(productId: number): void {
    this.router.navigate(['/products', productId]);
  }

  // ✅ العناصر المختارة فقط
  get selectedItems(): Product[] {
    return this.cartItems.filter(item => item.selected);
  }

  // ✅ المجموع قبل التخفيض
  getTotalBeforeDiscount(): number {
    return this.selectedItems.reduce((acc, item) => acc + item.productPrice * item.quantity, 0);
  }

  // ✅ حساب التخفيض (مثال بسيط)
  getDiscount(): number {
    return this.selectedItems.length ? 0.01 : 0;
  }

  // ✅ المجموع النهائي
  getTotal(): number {
    return this.getTotalBeforeDiscount() - this.getDiscount();
  }

  // يمكن تستعملها في (change) ديال checkbox
  updateSummary() {
    this.cartService.updateCart(this.cartItems);
  }
  validerCommande() {
  this.router.navigate(['/validation']);
}
}
