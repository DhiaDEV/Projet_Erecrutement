import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Interview } from 'src/app/objects/InterviewObject';
import { catchError } from 'rxjs/operators';
import { Feedback } from 'src/app/objects/FeedBackObject';

@Injectable({
  providedIn: 'root'
})
export class FeedBackService {
  private apiUrl = 'http://localhost:8082/api/FeedBack';

  constructor(private http: HttpClient) {}


  saveFeedback(feedBack:Feedback ): Observable<Feedback> {
    const token = localStorage.getItem('token');

    if (!token) {
      console.error("❌ Aucun token trouvé !");
      return throwError(() => new Error("Aucun token d'authentification trouvé."));
    }

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    });

    return this.http.post<Feedback>(`${this.apiUrl}/save`,feedBack, { headers })
      .pipe(
        catchError(error => {
          console.error('❌ Erreur lors du chargement des entretiens:', error);
          return throwError(() => error);
        })
      );
  }


}
