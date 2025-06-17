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
import { StockService } from '../services/stock.service'; // تأكد من المسار صحيح

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

  // نجيبوا الستوك الأصلي من API
  this.http.get<ProductStock[]>('http://localhost:3000/api/stock').subscribe(stockData => {
    // نضيف originalStock لكل منتج فـ cartItems
    this.cartItems.forEach(item => {
      const stockItem = stockData.find(s => s.productId === item.productId);
      if (stockItem) {
        item.originalStock = stockItem.quantity;  // هادي مهمة
      }
    });

    // إعداد الكميات والاختيار
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
    const discount = selectedItems.length ? 0.01 : 0;  // استعمل المنطق ديالك هنا
    const total = totalBeforeDiscount - discount;

    this.orderSummary = {
      items: selectedItems,
      totalBeforeDiscount,
      discount,
      total
    };

    // خزّن الملخص في السيرفيس
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

  // العناصر المختارة فقط
  get selectedItems(): Product[] {
    return this.cartItems.filter(item => item.selected);
  }

  // المجموع قبل التخفيض
  getTotalBeforeDiscount(): number {
    return this.selectedItems.reduce((acc, item) => acc + item.productPrice * item.quantity, 0);
  }

  // حساب التخفيض (مثال بسيط)
  getDiscount(): number {
    return this.selectedItems.length ? 0.01 : 0;
  }

  // المجموع النهائي
  getTotal(): number {
    return this.getTotalBeforeDiscount() - this.getDiscount();
  }

  // استعملها مثلا مع تغيير اختيار checkbox
  updateSummary() {
    this.cartService.updateCart(this.cartItems);
    this.updateOrderSummary();
  }

  validerCommande() {
    this.router.navigate(['/validation']);
  }
}
