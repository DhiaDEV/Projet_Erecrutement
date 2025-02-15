import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Interview } from 'src/app/objects/InterviewObject';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class InterviewService {
  private apiUrl = 'http://localhost:8082/api/interview';

  constructor(private http: HttpClient) {}

  saveInterview(interview: any): Observable<Interview> {
    const token = localStorage.getItem('token');

    if (!token) {
      console.error("❌ Aucun token trouvé !");
      return throwError(() => new Error("Aucun token d'authentification trouvé."));
    }

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    });

    return this.http.post<Interview>(`${this.apiUrl}/save`, interview, { headers })
      .pipe(
        catchError(error => {
          console.error('❌ Erreur lors de l\'enregistrement:', error);
          return throwError(() => error);
        })
      );
  }

  getInterviews(): Observable<Interview[]> {
    const token = localStorage.getItem('token');

    if (!token) {
      console.error("❌ Aucun token trouvé !");
      return throwError(() => new Error("Aucun token d'authentification trouvé."));
    }

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    });

    return this.http.get<Interview[]>(`${this.apiUrl}/all`, { headers })
      .pipe(
        catchError(error => {
          console.error('❌ Erreur lors du chargement des entretiens:', error);
          return throwError(() => error);
        })
      );
  }

  getinterviewbyCandidat(id:Number|undefined): Observable<Interview> {
    const token = localStorage.getItem('token');

    if (!token) {
      console.error("❌ Aucun token trouvé !");
      return throwError(() => new Error("Aucun token d'authentification trouvé."));
    }

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    });

    return this.http.get<Interview>(`${this.apiUrl}/findbyid/${id}`, { headers })
      .pipe(
        catchError(error => {
          console.error('❌ Erreur lors du chargement des entretiens:', error);
          return throwError(() => error);
        })
      );
  }




}
