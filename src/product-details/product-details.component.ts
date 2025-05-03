import { Component, Input, OnInit } from '@angular/core';
import { Product } from '../models/Product';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-details',
  imports: [FormsModule, CommonModule],
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']  // تصحيح: styleUrls بدل styleUrl
})
export class ProductDetailsComponent implements OnInit {
  @Input() product: Product | null = null;
  selectedImage: string = ''; // تحديد المتغير هنا داخل الكلاس

  // تنفيذ الكود عند بدء تحميل المكون
  ngOnInit(): void {
    if (this.product?.imageUrl?.length) {
      this.selectedImage = this.product.imageUrl[0]; // الصورة الافتراضية هي الأولى
    }
  }

  // اختيار الصورة عند النقر
  selectImage(img: string): void {
    this.selectedImage = img;
  }
}
