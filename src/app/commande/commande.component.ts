import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-commande',
   imports: [CommonModule, FormsModule,RouterModule],
  standalone: true,
  templateUrl: './commande.component.html',
  styleUrls: ['./commande.component.css']
})
export class CommandeComponent implements OnInit {
  orders: any[] = [];
constructor(private router: Router) {}
  ngOnInit(): void {
    this.orders = JSON.parse(localStorage.getItem('orders') || '[]');
  }

  // باش تغيري حالة الطلب يدوياً (اختياري)
  updateStatus(order: any, newStatus: string) {
    order.status = newStatus;
    localStorage.setItem('orders', JSON.stringify(this.orders));
  }
deleteOrder(orderId: number) {
    if (confirm("Voulez-vous vraiment supprimer cette commande ?")) {
      this.orders = this.orders.filter(order => order.id !== orderId);
      localStorage.setItem('orders', JSON.stringify(this.orders));
    }
  
}
goToConfirmation(orderId: number) {
  this.router.navigate(['/confirmation'], { queryParams: { id: orderId } });
}
}