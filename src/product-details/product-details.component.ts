import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Product } from '../models/Product';

@Component({
  selector: 'app-product-details',
  standalone: true, // ✅ إضافة هذه السطر
  imports: [CommonModule], 
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  product: Product | null = null;
  selectedImage: string = '';
  private apiUrl = 'http://localhost:3000/api/products';

  constructor(
    private route: ActivatedRoute, // ✅ للحصول على الـ id من الرابط
    private http: HttpClient, // ✅ لجلب البيانات من الخادم
    private router: Router
  ) {}

  ngOnInit(): void {
    const productId = this.route.snapshot.paramMap.get('id'); // ✅ استخراج الـ id
    if (productId) {
      this.http.get<Product>(`${this.apiUrl}/${productId}`).subscribe({
        next: (data) => {
          this.product = data;
          if (this.product.imageUrl?.length) {
            this.selectedImage = this.product.imageUrl[0];
          }
        },
        error: () => {
          this.router.navigate(['/']); // ✅ إعادة التوجيه إذا حدث خطأ
        }
      });
    }
  }

  selectImage(img: string): void {
    this.selectedImage = img;
  }
}