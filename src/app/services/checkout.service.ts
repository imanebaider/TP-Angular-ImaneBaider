import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {
  private addressData: any = {};
  private orderSummary: any = {};  // هنا نخزن ملخص الطلب

  // حفظ بيانات العنوان
  setAddress(data: any) {
    this.addressData = data;
  }

  // جلب بيانات العنوان
  getAddress() {
    return this.addressData;
  }

  // حفظ ملخص الطلب (المنتجات، الكمية، السعر...)
  setOrderSummary(summary: any) {
    this.orderSummary = summary;
  }

  // جلب ملخص الطلب
  getOrderSummary() {
    return this.orderSummary;
  }
}
