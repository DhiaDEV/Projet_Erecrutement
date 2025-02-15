import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Candidature, Status } from 'src/app/objects/CandidatureObject';

@Injectable({
  providedIn: 'root'
})
export class CandidatureService {
  private apiUrl = "http://localhost:8082/api/candidature";

  constructor(private http: HttpClient) {}

  getAllCandidature(): Observable<Candidature[]> {
    const token = localStorage.getItem('token');

    if (!token) {
      console.error('No token found in localStorage');
      // You might want to handle this case, perhaps by redirecting to login
      // or returning an empty observable
      return new Observable<Candidature[]>();
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get<Candidature[]>(`${this.apiUrl}/all`, { headers });
  }

  updateCandidatureStatus(id: number, newStatus: Status): Observable<Candidature> {
    const token = localStorage.getItem('token');

    if (!token) {
      console.error('No token found in localStorage');
      return new Observable<Candidature>();
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.put<Candidature>(
      `${this.apiUrl}/update-status/${id}?newStatus=${newStatus}`,
      {},
      { headers }
    );
  }
  getCandidaturesToBeConvoked(): Observable<Candidature[]> {
    const token = localStorage.getItem('token');

    if (!token) {
      console.error('No token found in localStorage');
      return new Observable<Candidature[]>();
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get<Candidature[]>(`${this.apiUrl}/filtered?status=TO_BE_CONVOKED`, { headers });
  }


}
