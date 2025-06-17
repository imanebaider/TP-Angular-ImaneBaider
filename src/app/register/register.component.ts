import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService, User } from '../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  role: 'client' | 'gerant' | 'admin' = 'client'; // Par défaut

  constructor(private router: Router, private authService: AuthService) {}
register() {
  if (this.password !== this.confirmPassword) {
    alert('Les mots de passe ne correspondent pas');
    return;
  }

  const newUser: User = {
    email: this.email,
    password: this.password,
    role: this.role
  };

  const success = this.authService.register(newUser);
  if (success) {
    alert('Inscription réussie !');
    this.router.navigate(['/login']);
  } else {
    alert('Cet utilisateur existe déjà.');
  }
}

}
