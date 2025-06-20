import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service'; 
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
    const role = this.authService.getUserRole();

    if (role === 'admin') {
      this.router.navigate(['/admin']);   
    } else if (role === 'client') {
      this.router.navigate(['']);   
    
    } else {
      this.router.navigate(['']);  
    }

  } else {
    this.errorMessage = 'Email ou mot de passe incorrect.';
    alert(this.errorMessage);
  }
}

}
