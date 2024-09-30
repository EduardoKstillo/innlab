import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoanRequestService {
  private baseUrl = 'http://localhost:8080/api/loan-requests';

  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('auth-token');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  }

  createLoanRequest(loanRequestData: any): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.post(`${this.baseUrl}`, loanRequestData, { headers });
  }

  getLoanRequests(): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.get(`${this.baseUrl}`, { headers });
  }

  getLoanRequestById(loanRequestId: number): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.get(`${this.baseUrl}/${loanRequestId}`, { headers });
  }

  approveLoanRequest(loanRequestId: number): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.patch(`${this.baseUrl}/${loanRequestId}/approve`, {}, { headers });
  }

  rejectLoanRequest(loanRequestId: number): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.patch(`${this.baseUrl}/${loanRequestId}/reject`, {}, { headers });
  }

  returnLoanRequest(loanRequestId: number): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.patch(`${this.baseUrl}/${loanRequestId}/return`, {}, { headers });
  }

  getLoanRequestsByProject(projectId: number): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.get(`${this.baseUrl}/projects/${projectId}`, { headers });
  }
}
