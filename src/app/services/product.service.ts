import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../../models/Product';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'http://localhost:3000/api/products'; // API ديالك

  constructor(private http: HttpClient) {}

  getProducts(): Observable<Product[]> {
    return this.http.get<any[]>(this.apiUrl).pipe(
      map(apiProducts => apiProducts.map(apiProduct => new Product(
        0, // productId: ما عندناش فـ API id رقمي
        apiProduct.productTitle,
        parseFloat(apiProduct.prouctPrice), // نحولو الرقم لي كان String
        1, // quantity: مثلا نخليه 1
        '', // description: فارغة مؤقتا
        apiProduct.productImage // imageUrl
      )))
    );
  }
}
