import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core'; 
import { Product } from '../../models/Product';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { StockService , ProductStock} from '../services/stock.service';

@Component({
  selector: 'app-stock',
  standalone: true,  // هادي باش تولي standalone
  imports: [CommonModule,RouterModule,FormsModule,  ],
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.css']
})
export class StockComponent implements OnInit {
  stockFaibleSeuil = 5;

  stocks: ProductStock[] = [];
  editingProductId: number | null = null;
  newQuantity: number = 0;

  constructor(private stockService: StockService) {}

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
  
}
