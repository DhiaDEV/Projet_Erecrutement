import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http"; // Change this line
import { Observable } from "rxjs"; // Change this line
import { map, tap } from "rxjs/operators";
import { Candidature, Status } from "../objects/CandidatureObject";
import { User, UserRole } from "../objects/UserObject";

interface AuthResponse {
  token: string;
  message?: string;
  username: string;
  user:User;
}

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private apiUrl = "http://localhost:8082/api/user";
  private username: string | null = null;  // Add username property
  user?:User | undefined;
  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<AuthResponse> {
    return this.http
      .post<AuthResponse>(`${this.apiUrl}/authenticate`, { email, password })
      .pipe(
        tap((response) => {
          this.username = response.username;  // Store the username
          this.user=response.user;
          console.log(this.user)
          if (response && response.token) {
            localStorage.setItem("token", response.token);
            localStorage.setItem("username", response.username);
            if (response && response.user && response.user.id) {

              localStorage.setItem("userid", response.user.id.toString()); // Ensure ID is stored as a string
            } else {
              console.error("Invalid response structure:", response);
            }
          }
        })
      );
  }
  getUserFromServer() {
     const token = localStorage.getItem('token');

        if (!token) {
          console.error("❌ Aucun token trouvé !");
        }

        const headers = new HttpHeaders({
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        });
    const userId = localStorage.getItem("userid");
    return this.http.get<User>(`${this.apiUrl}/user/${userId}`,{headers}).pipe(
      tap(user => {
        this.user=user;
        console.log(this.user)
      })
    );
  }




  logout(): void {
    localStorage.removeItem("token");
    this.username = null;  // Clear the username on logout
  }

  isUserLoggedIn(): boolean {
    return !!localStorage.getItem("token");
  }

  getUsername(): string | null {
    return this.username;  // Return the stored username
  }
  getManagers(): Observable<User[]> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem("token")}`
    });

    return this.http.get<User[]>(`${this.apiUrl}/all`, { headers }).pipe(
      map(users => users.filter(user => user.role === UserRole.MANAGER)),  // Filtrer uniquement les MANAGERS
      tap(managers => console.log('🎯 Managers chargés:', managers))
    );
  }

}
