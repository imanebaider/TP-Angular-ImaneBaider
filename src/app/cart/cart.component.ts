import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';
import { Product } from '../../models/Product';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CheckoutService } from '../services/checkout.service';
import { RouterModule } from '@angular/router';
import { ProductStock } from '../services/stock.service';
import { StockService } from '../services/stock.service'; 

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  currentStep = 1;
  cartItems: Product[] = [];
  orderSummary: any = {};

  constructor(
    private cartService: CartService,
    private http: HttpClient,
    private router: Router,
    private checkoutService: CheckoutService,
     private stockService: StockService
  ) {}

ngOnInit() {
  this.cartItems = this.cartService.getItems();

  this.http.get<ProductStock[]>('http://localhost:3000/api/stock').subscribe(stockData => {
    this.cartItems.forEach(item => {
      const stockItem = stockData.find(s => s.productId === item.productId);
      if (stockItem) {
        item.originalStock = stockItem.quantity;  
      }
    });

    this.cartItems.forEach(item => {
      if (!item.quantity || item.quantity < 1) {
        item.quantity = 1;
      }
      if (item.selected === undefined) {
        item.selected = true;
      }
    });

    this.updateOrderSummary();
  });
}


  updateOrderSummary() {
    const selectedItems = this.cartItems.filter(item => item.selected);

    const totalBeforeDiscount = selectedItems.reduce((acc, item) => acc + item.productPrice * item.quantity, 0);
    const discount = selectedItems.length ? 0.01 : 0;  
    const total = totalBeforeDiscount - discount;

    this.orderSummary = {
      items: selectedItems,
      totalBeforeDiscount,
      discount,
      total
    };

    this.checkoutService.setOrderSummary(this.orderSummary);
  }

  onQuantityChange(product: Product) {
    if (product.quantity < 1) {
      product.quantity = 1;
    }
    this.cartService.updateCart(this.cartItems);
    this.updateOrderSummary();
  }

  clearCart() {
    this.cartService.clearCart();
    this.cartItems = [];
    this.updateOrderSummary();
  }

  removeItem(productToRemove: Product): void {
    this.cartItems = this.cartItems.filter(p => p.productId !== productToRemove.productId);
    this.cartService.updateCart(this.cartItems);
    this.updateOrderSummary();
  }

  goToProductDetails(productId: number): void {
    this.router.navigate(['/products', productId]);
  }

  get selectedItems(): Product[] {
    return this.cartItems.filter(item => item.selected);
  }

  getTotalBeforeDiscount(): number {
    return this.selectedItems.reduce((acc, item) => acc + item.productPrice * item.quantity, 0);
  }

  getDiscount(): number {
    return this.selectedItems.length ? 0.01 : 0;
  }

  getTotal(): number {
    return this.getTotalBeforeDiscount() - this.getDiscount();
  }

  updateSummary() {
    this.cartService.updateCart(this.cartItems);
    this.updateOrderSummary();
  }

  validerCommande() {
    this.router.navigate(['/validation']);
  }
}
