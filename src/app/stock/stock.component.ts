
import { Product } from '../../models/Product';
import { HttpClient } from '@angular/common/http';
import { StockService , ProductStock} from '../services/stock.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { jsPDF } from 'jspdf';

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




  generatePDF() {
  const doc = new jsPDF();
  doc.setFontSize(14);
  doc.text('📦 Liste du Stock', 10, 10);
  doc.setFontSize(10);
  doc.text('Produit - Quantité - Type', 10, 20);
  doc.line(10, 22, 200, 22); // ligne de séparation

  let y = 30;
  this.stocks.forEach((item, index) => {
    const typeText = item.types ? item.types : 'N/A';
    doc.text(`${index + 1}. ${item.productTitle} - ${item.quantity} - ${typeText}`, 10, y);
    y += 10;
    if (y > 280) {
      doc.addPage(); // إذا وصلنا لنهاية الصفحة
      y = 10;
    }
  });

  doc.save('stock.pdf');
}

}
