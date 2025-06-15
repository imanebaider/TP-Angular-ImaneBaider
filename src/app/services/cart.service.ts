import { Injectable } from '@angular/core';
import { Product } from '../../models/Product';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems: Product[] = [];

  getItems(): Product[] {
    return this.cartItems;
  }

  addItem(product: Product): void {
    this.cartItems.push(product);
  }

  clearCart(): void {
    this.cartItems = [];
  }
  updateCart(newCart: Product[]): void {
  this.cartItems = newCart;
  // إذا كتخزن في localStorage مثلاً
  localStorage.setItem('cart', JSON.stringify(this.cartItems));
}

}
