import { Component, OnInit } from '@angular/core';
import { CheckoutService } from '../services/checkout.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-confirmation',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.css']
})
export class ConfirmationComponent implements OnInit {
  currentStep = 4;

  customer: any = {}; 
  orderItems: any[] = []; 
  subtotal = 0;
  shippingFee = 30;  
  tax = 0;
  total = 0;
  paymentMethod = 'Carte bancaire';
  isPaid = true;
  shippingCompany = 'Amana';
  trackingNumber = '123456789';
  estimatedDeliveryDate = new Date(Date.now() + 5 * 24 * 60 * 60 * 1000);
  orderId = 'CMD' + Math.floor(Math.random() * 1000000);
  orderDate = new Date();

  constructor(private checkoutService: CheckoutService) {}

  ngOnInit(): void {
    const address = this.checkoutService.getAddress();
    const summary = this.checkoutService.getOrderSummary();

    this.customer = {
      name: address.fullName,
      phone: address.phone,
      address: `${address.city}, ${address.street} ${address.apt}, ${address.city}, ${address.postal}`,
      email: address.email || 'Pas d\'email'
    };

    this.orderItems = summary.items || [];
    this.subtotal = summary.totalBeforeDiscount || 0;
    this.tax = Math.round(this.subtotal * 0.2);
    this.shippingFee = 30;
    this.total = summary.total || (this.subtotal + this.shippingFee + this.tax);

    const newOrder = {
      id: this.orderId,
      date: this.orderDate,
      items: this.orderItems,
      total: this.total,
      status: 'en cours', 
      customer: this.customer,
      shippingCompany: this.shippingCompany,
      trackingNumber: this.trackingNumber,
      estimatedDeliveryDate: this.estimatedDeliveryDate,
      paymentMethod: this.paymentMethod,
      isPaid: this.isPaid
    };

    const previousOrders = JSON.parse(localStorage.getItem('orders') || '[]');
    previousOrders.push(newOrder);
    localStorage.setItem('orders', JSON.stringify(previousOrders));
  }

  formatPrice(value: number): string {
    return new Intl.NumberFormat('fr-CH', {
      style: 'currency',
      currency: 'CHF',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(value);
  }

  printInvoice() {
    window.print();
  }
}
