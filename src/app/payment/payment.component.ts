import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CheckoutService } from '../services/checkout.service';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { StockService } from '../services/stock.service';
import { Observable, forkJoin } from 'rxjs';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [CommonModule, FormsModule,RouterModule],
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  currentStep = 3;
  address: any;
  orderSummary: any = {};

  constructor(private checkoutService: CheckoutService,private router: Router,private stockService: StockService) {}

  ngOnInit() {
    this.address = this.checkoutService.getAddress();
console.log("✅ Adresse récupérée dans paiement:", this.address);
    this.orderSummary = this.checkoutService.getOrderSummary();
  }

  getTotalBeforeDiscount(): number {
    return this.orderSummary.totalBeforeDiscount || 0;
  }

  getDiscount(): number {
    return this.orderSummary.discount || 0;
  }

  getTotal(): number {
    return this.orderSummary.total || 0;
  }
  editAddress() {
  return this.router.navigate(['/validation']);
}

onPay() {
  const items = this.orderSummary.items;

  const updateRequests: (Observable<any> | null)[] = items.map((item: any) => {
    const newQuantity = item.originalStock && item.quantity
      ? item.originalStock - item.quantity
      : undefined;

    if (newQuantity !== undefined) {
      return this.stockService.updateQuantity(item.productId, newQuantity);
    } else {
      return null;
    }
  });

  forkJoin(
    updateRequests.filter((req): req is Observable<any> => req !== null)
  ).subscribe({
    next: () => {
      console.log('Toutes les mises à jour du stock ont été effectuées avec succès');
      this.router.navigate(['/confirmation']);
    },
    error: (err) => {
      console.error('Erreur lors de la mise à jour du stock', err);
    }
  });
}


}
