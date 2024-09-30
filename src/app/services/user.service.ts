import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'http://localhost:8080/api/user'; // Cambia la URL según tu backend

  constructor(private http: HttpClient) {}

  // Obtener headers con el token de autenticación
  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('auth-token');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  }

  // Obtener todos los usuarios
  getAllUsers(): Observable<any> {
    return this.http.get(`${this.apiUrl}/all`, { headers: this.getAuthHeaders() }).pipe(
      catchError(this.handleError)
    );
  }

  // Buscar usuarios por email
  searchUsersByEmail(email: string): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.get(`${this.apiUrl}/search?email=${email}`, { headers });
  }

  // Crear un nuevo usuario
  createUser(userData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/create`, userData, { headers: this.getAuthHeaders() }).pipe(
      catchError(this.handleError)
    );
  }

  // Obtener un usuario por ID
  getUserById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`, { headers: this.getAuthHeaders() }).pipe(
      catchError(this.handleError)
    );
  }

  // Actualizar un usuario
  updateUser(id: number, userData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/update/${id}`, userData, { headers: this.getAuthHeaders() }).pipe(
      catchError(this.handleError)
    );
  }

  // Eliminar un usuario
  deleteUser(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/delete/${id}`, { headers: this.getAuthHeaders() }).pipe(
      catchError(this.handleError)
    );
  }

  // Manejo de errores
  private handleError(error: any) {
    console.error('An error occurred', error);
    return throwError(error.message || error);
  }
}
