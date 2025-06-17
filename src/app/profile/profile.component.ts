import { Component, OnInit } from '@angular/core';
import { AuthService, User } from '../services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule,FormsModule,RouterModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  currentUser: User | null = null;
  defaultAvatar: string = '';
  avatarPreview: string | null = null;
  selectedAvatarFile: File | null = null;

  bio: string = '';
  categories: string[] = ['Femme', 'Homme', 'Grande Taille', 'Enfants', 'Maison', 'Animaux'];
  styles: string[] = ['Basiques', 'Casual', 'Élégant', 'Sportif', 'Vintage', 'Fête'];

  selectedCategories: string[] = [];
  selectedStyles: string[] = [];

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.currentUser = this.authService.getCurrentUser();

    if (!this.currentUser) {
      this.router.navigate(['/login']);
      return;
    }

    this.defaultAvatar = `https://i.pravatar.cc/150?u=${this.currentUser.email}`;
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  triggerFileInput() {
    const input = document.getElementById('avatarInput') as HTMLInputElement;
    input?.click();
  }

  onAvatarChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedAvatarFile = file;
      const reader = new FileReader();
      reader.onload = () => {
        this.avatarPreview = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  toggleCategory(tag: string) {
    this.toggleSelection(tag, this.selectedCategories);
  }

  toggleStyle(tag: string) {
    this.toggleSelection(tag, this.selectedStyles);
  }

  toggleSelection(tag: string, list: string[]) {
    const index = list.indexOf(tag);
    if (index === -1) {
      list.push(tag);
    } else {
      list.splice(index, 1);
    }
  }

  saveProfile() {
    const updatedData = {
      avatar: this.avatarPreview,
      bio: this.bio,
      categories: this.selectedCategories,
      styles: this.selectedStyles
    };

    console.log('✔ Profil modifié :', updatedData);

    // Ici tu peux envoyer les données vers un backend via HttpClient
    alert('✅ Modifications enregistrées !');
  }
}