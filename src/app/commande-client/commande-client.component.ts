import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuthService } from '../services/auth.service';
@Component({
  selector: 'app-commande-client',
  templateUrl: './commande-client.component.html',
  styleUrls: ['./commande-client.component.css'],
  imports: [CommonModule, FormsModule,RouterModule],
  standalone: true
})
export class CommandeClientComponent implements OnInit {
  commandes: any[] = [];

  constructor(private router: Router,private authService: AuthService) {}

  ngOnInit(): void {
    this.loadCommandes();
  }

  loadCommandes() {
    const savedOrders = localStorage.getItem('orders');
    this.commandes = savedOrders ? JSON.parse(savedOrders) : [];
  }

  updateStatus(order: any, newStatus: string) {
    order.status = newStatus;
    this.saveCommandes();
  }

  deleteOrder(orderId: number) {
    if (confirm("Voulez-vous vraiment supprimer cette commande ?")) {
      this.commandes = this.commandes.filter(order => order.id !== orderId);
      this.saveCommandes();
    }
  }

  saveCommandes() {
    localStorage.setItem('orders', JSON.stringify(this.commandes));
  }

  goToConfirmation(orderId: number) {
    this.router.navigate(['/confirmation'], { queryParams: { id: orderId } });
  }
  
  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
