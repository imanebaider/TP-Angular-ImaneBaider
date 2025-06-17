// stock.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface ProductStock {
  productId: number;
  productTitle: string;
  quantity: number;
  types: string | string[];
  imageUrl?: string[];
  originalStock?: number;
}

@Injectable({
  providedIn: 'root',
})
export class StockService {
  private apiUrl = 'http://localhost:3000/api/stock';

  constructor(private http: HttpClient) {}

  getStock(): Observable<ProductStock[]> {
    return this.http.get<ProductStock[]>(this.apiUrl);
  }

  updateQuantity(productId: number, quantity: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/${productId}`, { quantity });
  }
}
