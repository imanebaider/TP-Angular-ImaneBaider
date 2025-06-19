import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {
  private addressData: any = {};
  private orderSummary: any = {};  

  setAddress(data: any) {
    this.addressData = data;
  }

  getAddress() {
    return this.addressData;
  }

  setOrderSummary(summary: any) {
    this.orderSummary = summary;
  }

  getOrderSummary() {
    return this.orderSummary;
  }

  setOrder(order: any) {
  const orders = JSON.parse(localStorage.getItem('orders') || '[]');
  orders.push(order);
  localStorage.setItem('orders', JSON.stringify(orders));
}

getOrders(): any[] {
  return JSON.parse(localStorage.getItem('orders') || '[]');
}

}
