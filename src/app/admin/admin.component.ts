import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { CartService } from '../services/cart.service';
import { AuthService } from '../services/auth.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { forkJoin } from 'rxjs';
import { NgChartsModule } from 'ng2-charts';
import { ChartConfiguration } from 'chart.js';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule, HttpClientModule, NgChartsModule],
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  productsCount: number = 0;
  parfumsCount: number = 0;
  sacsCount: number = 0;
  robesCount: number = 0;
  talonsCount: number = 0;
  stockCount: number = 0;

  // données du graphique
  lineChartData: ChartConfiguration<'line'>['data'] = {
    labels: [],
    datasets: [
      {
        data: [],
        label: 'Stock par type',
        borderColor: '#3498db',
        backgroundColor: 'rgba(52, 152, 219, 0.2)',
        fill: true
      }
    ]
  };

  constructor(
    private http: HttpClient,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.getStockCount();
    this.fetchStock();
  }

  getStockCount(): void {
    const urls = [
      'http://localhost:3000/api/products',
      'http://localhost:3000/api/parfums',
      'http://localhost:3000/api/sacs',
      'http://localhost:3000/api/robes',
      'http://localhost:3000/api/talons'
    ];

    const requests = urls.map(url => this.http.get<any[]>(url));

    forkJoin(requests).subscribe(results => {
      const [products, parfums, sacs, robes, talons] = results;

      this.productsCount = products.reduce((acc, p) => acc + (p.quantity || 0), 0);
      this.parfumsCount = parfums.reduce((acc, p) => acc + (p.quantity || 0), 0);
      this.sacsCount = sacs.reduce((acc, p) => acc + (p.quantity || 0), 0);
      this.robesCount = robes.reduce((acc, p) => acc + (p.quantity || 0), 0);
      this.talonsCount = talons.reduce((acc, p) => acc + (p.quantity || 0), 0);

      this.stockCount = this.productsCount + this.parfumsCount + this.sacsCount + this.robesCount + this.talonsCount;
    }, error => {
      console.error('Erreur lors de la récupération du stock :', error);
    });
  }

  fetchStock(): void {
    this.http.get<any[]>('http://localhost:3000/api/stock').subscribe(data => {
      const stockMap: { [type: string]: number } = {};

      data.forEach(item => {
        const type = item.types;
        const qty = item.quantity || 0;
        stockMap[type] = (stockMap[type] || 0) + qty;
      });

      this.lineChartData.labels = Object.keys(stockMap);
      this.lineChartData.datasets[0].data = Object.values(stockMap);
    });
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
