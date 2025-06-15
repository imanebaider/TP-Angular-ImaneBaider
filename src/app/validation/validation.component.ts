import { Component } from '@angular/core';
import { FormsModule, FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-validation',
  templateUrl: './validation.component.html',
  styleUrls: ['./validation.component.css'],  // لازم يكون 'styleUrls' مع s
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule]   // خاص تضمن ReactiveFormsModule هنا
})
export class ValidationComponent {
  currentStep = 2;
  selectedItems: any[] = [];  // عرفناها كـ any[] (يمكنك تخصص النوع)
  addressForm: FormGroup;
  livraison = 'standard';

  constructor(private fb: FormBuilder, private router: Router,) {
    this.addressForm = this.fb.group({
      nom: ['', Validators.required],
      adresse: ['', Validators.required],
      ville: ['', Validators.required],
      codePostal: ['', Validators.required],
      telephone: ['', Validators.required],
    });
  }

  goToPaiement() {
    if (this.addressForm.valid) {
      // تقدر تخزن البيانات هنا أو تبعتهم للسيرفر

      this.router.navigate(['/payer']);
    }
  }

  
// Total brut (sans réduction)
getTotalBeforeDiscount(): number {
  return this.selectedItems.reduce((total, item) => {
    return total + item.productPrice * item.quantity;
  }, 0);
}

// Simule une réduction
getDiscount(): number {
  const total = this.getTotalBeforeDiscount();
  return total >= 500 ? total * 0.05 : 0; // -5% si total >= 500
}

// Total après réduction
getTotal(): number {
  return this.getTotalBeforeDiscount() - this.getDiscount();
}
}
