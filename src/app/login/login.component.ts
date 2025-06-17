import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';  // استيراد الخدمة
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,  
  imports: [FormsModule, RouterModule],  
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']  
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private router: Router, private authService: AuthService) {}

  login() {
    const success = this.authService.login(this.email, this.password);

    if (success) {
      alert('Connexion réussie !');
      this.router.navigate(['catalog']);
    } else {
      this.errorMessage = 'Email ou mot de passe incorrect.';
      alert(this.errorMessage);
    }
  }
}
