import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-colliers-perles',
  templateUrl: './colliers-perles.component.html',
  styleUrls: ['./colliers-perles.component.css'],
  imports: [CommonModule]
})
export class ColliersPerlesComponent implements OnInit {
  products: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http.get<any[]>('http://localhost:3000/api/products?type=perles').subscribe({
      next: (data) => this.products = data,
      error: (err) => console.error(err)
    });
  }
}
