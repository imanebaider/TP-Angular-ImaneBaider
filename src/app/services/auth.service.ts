import { Injectable } from '@angular/core';

export interface User {
  email: string;
  password: string;
  role: 'client' | 'gerant' | 'admin';
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private users: User[] = [
    { email: 'client@test.com', password: '1234', role: 'client' },
    { email: 'gerant@test.com', password: '1234', role: 'gerant' },
    { email: 'admin@test.com', password: '1234', role: 'admin' },
  ];

  private currentUser: User | null = null;
constructor() {
  // أول مرة فقط، خزّن المستخدمين الافتراضيين إلا ما كانوش موجودين
  const existingUsers = localStorage.getItem('users');
  if (!existingUsers) {
    localStorage.setItem('users', JSON.stringify(this.users));
  }
}

  login(email: string, password: string): boolean {
  const users = this.getUsers(); // جبدهم من localStorage
  const user = users.find(u => u.email === email && u.password === password);

  if (user) {
    this.currentUser = user;
    localStorage.setItem('currentUser', JSON.stringify(user));
    return true;
  }

  return false;
}

  logout(): void {
    this.currentUser = null;
    localStorage.removeItem('currentUser');
  }

  isLoggedIn(): boolean {
    if (this.currentUser) return true;

    // حاول تشوف في localStorage
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      this.currentUser = JSON.parse(storedUser);
      return true;
    }

    return false;
  }

  getUserRole(): string | null {
    return this.currentUser?.role || null;
  }

  getCurrentUser(): User | null {
    return this.currentUser;
  }
  register(user: User): boolean {
  const users = this.getUsers(); // جبد المستخدمين من localStorage
  const exists = users.find(u => u.email === user.email);

  if (exists) return false; // المستخدم موجود

  users.push(user); // زيد المستخدم الجديد
  localStorage.setItem('users', JSON.stringify(users)); // خزّنهم

  this.currentUser = user;
  localStorage.setItem('currentUser', JSON.stringify(user));
  return true;
}

getUsers(): User[] {
  const data = localStorage.getItem('users');
  return data ? JSON.parse(data) : [];
}

}
