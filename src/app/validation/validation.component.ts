import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CheckoutService } from '../services/checkout.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-validation',
  templateUrl: './validation.component.html',
  styleUrls: ['./validation.component.css'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule,RouterModule ]
})
export class ValidationComponent implements OnInit {
  currentStep = 2;
  addressForm: FormGroup;

  orderSummary: any = {
    items: [],
    totalBeforeDiscount: 0,
    discount: 0,
    total: 0
  };

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private checkoutService: CheckoutService
  ) {
    this.addressForm = this.fb.group({
      fullName: ['', Validators.required],
      street: ['', Validators.required],
      apt: [''],
      city: ['', Validators.required],
      postal: ['', Validators.required],
      phone: ['', Validators.required],
    });
  }

  ngOnInit() {
    // نجيب ملخص الطلب من السيرفس
    this.orderSummary = this.checkoutService.getOrderSummary();

    // نجيب العنوان إذا كان مخزن (لتعبئة الفورم)
    const savedAddress = this.checkoutService.getAddress();
    if (savedAddress) {
      this.addressForm.patchValue(savedAddress);
    }
  }

  // يمكن تحسب هنا أو تعتمد على orderSummary المخزن مسبقاً
  getTotalBeforeDiscount(): number {
    return this.orderSummary.totalBeforeDiscount || 0;
  }

  getDiscount(): number {
    return this.orderSummary.discount || 0;
  }

  getTotal(): number {
    return this.orderSummary.total || 0;
  }
goToPaiement() {
  if (this.addressForm.valid) {
    const formData = this.addressForm.value;

    // 👇 خزني الاسم فـ localStorage
    localStorage.setItem('clientName', formData.fullName);

    // خزني العنوان كامل فـ service
    this.checkoutService.setAddress(formData);

    // تنقل لصفحة الدفع
    this.router.navigate(['/payment']);
  } else {
    this.addressForm.markAllAsTouched();
  }
}




   onContinue() {
    this.checkoutService.setAddress(this.addressForm);
    this.router.navigate(['/payement']);
  }
  payment() {
  this.router.navigate(['/payment']);
}

}
