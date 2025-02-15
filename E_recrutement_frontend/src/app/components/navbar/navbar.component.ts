import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router'; // Change this line
import { AuthService } from '../../services/auth.service';
import { Notification } from '../../objects/NotificationObject';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  @ViewChild('dropdownMenu', { static: true }) dropdownMenu!: ElementRef;
  notifications: Notification[] = [];
  notificationsNum: number = 0;
  username : string = ' ';

  constructor(private router: Router, private authService: AuthService) {}
  ngOnInit() {
    this.loadNotifications()
    this.username = this.getUsername()
  }

  loadNotifications() {
    // This is where you'd typically fetch notifications from a service
    this.notifications = [
      new Notification("Nouvelle offre", "Vous avez une nouvelle offre spéciale!", "10 minutes ago", false),
      new Notification("Message reçu", "Vous avez un message dans votre boîte de réception.", "1 hour ago", false),
      new Notification(
        "Mise à jour système",
        "Une mise à jour de votre application est disponible.",
        "2 days ago",
        false,
      ),
    ]
    this.updateNotificationCount()
  }

  updateNotificationCount() {
    this.notificationsNum = this.notifications.filter((n) => !n.etat).length
  }

  clearAll() {
    this.notifications = []; 
    this.updateNotificationCount();
  }

  toggleNotifications(): void {
    this.dropdownMenu.nativeElement.classList.toggle("hidden")
  }

  isLoggedIn(): boolean {
    return this.authService.isUserLoggedIn()
  }

  getUsername(): string {
    const storedUsername = localStorage.getItem("username")
    return storedUsername !== null ? storedUsername : ""
  }

  login(): void {
    this.router.navigate(["/login"])
  }

  logout(): void {
    this.authService.logout()
    this.router.navigate(["/login"])
  }
}

