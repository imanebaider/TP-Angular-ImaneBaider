import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, catchError, of } from 'rxjs';
import { Client } from '../../models/Client';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  private baseUrl = 'http://localhost:3000'; // أساس URL ديال السيرفر

  constructor(private http: HttpClient) {}

  // دالة تسجيل الدخول مع POST /login
  login(email: string, password: string): Observable<Client | null> {
    return this.http.post<Client>(`${this.baseUrl}/login`, { email, password }).pipe(
      map(client => client || null),
      catchError(err => {
        // في حالة الخطأ (مثلاً 401) نرجع null
        return of(null);
      })
    );
  }

  // دالة تسجيل مستخدم جديد (يمكنها تبقى كما هي)
  register(newClient: Client): Observable<Client> {
    return this.http.post<Client>(`${this.baseUrl}/clients`, newClient);
  }

  // جلب كل العملاء
  getAllClients(): Observable<Client[]> {
    return this.http.get<Client[]>(`${this.baseUrl}/clients`);
  }
}
