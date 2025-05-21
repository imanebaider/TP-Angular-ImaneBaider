import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Product } from '../../models/Product';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true ,
 /* selector: 'app-product-details',*/
  imports: [CommonModule],
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
  
})
export class ProductDetailsComponent implements OnInit {
  product!: Product;
  selectedImage: string = '';

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    
    this.http.get<Product>(`http://localhost:3000/api/products/${id}`).subscribe({
      next: (data) => {
        this.product = data;
        this.selectedImage = data.imageUrl[0]; // اختيار أول صورة افتراضيا
      },
      error: (err) => {
        console.error('خطأ في جلب البيانات', err);
        this.router.navigate(['/not-found']); // توجيه لصفحة 404 إن لزم
      }
    });
  }

  selectImage(img: string): void {
    this.selectedImage = img;
  }
}


