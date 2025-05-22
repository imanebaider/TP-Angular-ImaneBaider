import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../../models/Product';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'http://localhost:3000/api/products';

  constructor(private http: HttpClient) {}

  getProducts(): Observable<Product[]> {
    return this.http.get<any[]>(this.apiUrl).pipe(
      map(apiProducts => apiProducts.map(apiProduct => new Product(
        0, 
        apiProduct.productTitle,
        parseFloat(apiProduct.productPrice),
        1, // quantity: مبدئيا نخليوها 1
        '', // description: مؤقتا فارغة
        apiProduct.productImage, 
        0, 
        apiProduct.type 
      )))
    );
  }
}
