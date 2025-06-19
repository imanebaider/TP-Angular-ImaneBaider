
import { Product } from '../../models/Product';
import { HttpClient } from '@angular/common/http';
import { StockService , ProductStock} from '../services/stock.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuthService } from '../services/auth.service';
@Component({
  selector: 'app-stock',
  standalone: true,  
  imports: [CommonModule,RouterModule,FormsModule,  ],
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.css']
})
export class StockComponent implements OnInit {
  stockFaibleSeuil = 5;

  stocks: ProductStock[] = [];
  editingProductId: number | null = null;
  newQuantity: number = 0;

  constructor(private stockService: StockService,private authService: AuthService ,private router: Router,) {}

  ngOnInit() {
    this.loadStock();
  }

  loadStock() {
    this.stockService.getStock().subscribe((data) => {
      this.stocks = data;
    });
  }

  startEdit(product: ProductStock) {
    this.editingProductId = product.productId;
    this.newQuantity = product.quantity;
  }

  saveQuantity(productId: number) {
    this.stockService.updateQuantity(productId, this.newQuantity).subscribe(() => {
      this.editingProductId = null;
      this.loadStock();
    });
  }

  cancelEdit() {
    this.editingProductId = null;
  }
  

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

}
