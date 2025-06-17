import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, catchError, of } from 'rxjs';
import { Client } from '../../models/Client';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  private baseUrl = 'http://localhost:3000'; 

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<Client | null> {
    return this.http.post<Client>(`${this.baseUrl}/login`, { email, password }).pipe(
      map(client => client || null),
      catchError(err => {
        return of(null);
      })
    );
  }

  register(newClient: Client): Observable<Client> {
    return this.http.post<Client>(`${this.baseUrl}/clients`, newClient);
  }

  getAllClients(): Observable<Client[]> {
    return this.http.get<Client[]>(`${this.baseUrl}/clients`);
  }
}
