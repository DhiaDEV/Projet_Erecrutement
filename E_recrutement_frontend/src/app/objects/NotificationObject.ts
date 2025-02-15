export class Notification {
  titrenotif: string;
  descriptionnotif: string;
  time: string;  // Format: "10 minutes ago", "2 hours ago", etc.
  etat: boolean; // true pour vu, false pour non vu

  constructor(titrenotif: string, descriptionnotif: string, time: string, etat: boolean) {
    this.titrenotif = titrenotif;
    this.descriptionnotif = descriptionnotif;
    this.time = time;
    this.etat = etat;
  }
}
