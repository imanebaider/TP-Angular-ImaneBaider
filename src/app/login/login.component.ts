import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';  // Import du FormsModule

interface Client {
  email: string;
  password: string;
}

@Component({
  selector: 'app-login',
  standalone: true,  
  imports: [FormsModule],  
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']  
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  clients: Client[] = [
    { email: 'imane@test.com', password: '1234' }
  ];

  constructor(private router: Router) {}

  login() {
    const user = this.clients.find(
      c => c.email === this.email && c.password === this.password
    );

    if (user) {
      alert('Connexion réussie !');
      this.router.navigate(['catalog']);  // Navigation vers la page d’accueil
    } else {
      alert('Email ou mot de passe incorrect.');
    }
  }
}
