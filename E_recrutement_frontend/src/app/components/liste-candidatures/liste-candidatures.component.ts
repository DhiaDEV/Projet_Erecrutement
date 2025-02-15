import { Component, OnInit } from '@angular/core';
import { Candidature, Status } from 'src/app/objects/CandidatureObject';
import { CandidatureService } from 'src/app/services/Candidature/candidature.service';

@Component({
  selector: 'app-liste-candidatures',
  templateUrl: './liste-candidatures.component.html',
  styleUrls: ['./liste-candidatures.component.scss']
})
export class ListeCandidaturesComponent implements OnInit {
  Status = Status;
  // Déclaration des variables
  candidatures: Candidature[] = [];
  isDropdownOpen: { [key: string]: boolean } = { dropdown1: false, dropdown2: false };
  showPopup: boolean = false;
  popupDecision: string = '';
  selectedCandidature: Candidature | null = null;
  dropdownPosteLabel: string = 'Filtrage Par Poste';
  dropdownStatutLabel: string = 'Filtrage Par Status';
  postes: string[] = ['Tous Les Postes', 'Développement', 'QATester', 'DevOps', 'DataScience'];
  statuts: (Status | 'Tous Les Status')[] = ['Tous Les Status', ...Object.values(Status)];

  selectedPoste: string = '';
  selectedStatut: Status | '' = '';

  constructor(private candidatureService: CandidatureService) {}

  ngOnInit(): void {
    this.loadCandidatures();
  }

  loadCandidatures() {
    this.candidatureService.getAllCandidature().subscribe(
      (candidates) => {
        this.candidatures = candidates;
      },
      (error) => {
        console.error('Error:', error);
      }
    );
  }

  toggleDropdown(dropdown: string): void {
    this.isDropdownOpen[dropdown] = !this.isDropdownOpen[dropdown];
  }

  selectOption(dropdown: string, value: string | Status): void {
    if (dropdown === 'dropdown1') {
      this.selectedPoste = value === 'Tous Les Postes' ? '' : value as string;
      this.dropdownPosteLabel = value === 'Tous Les Postes' ? 'Filtrage Par Poste' : value as string;
    } else if (dropdown === 'dropdown2') {
      this.selectedStatut = value === 'Tous Les Status' ? '' : value as Status;
      this.dropdownStatutLabel = value === 'Tous Les Status' ? 'Filtrage Par Status' : value as string;
    }
    this.isDropdownOpen[dropdown] = false;
  }

  openPopup(candidature: Candidature): void {
    this.selectedCandidature = candidature;
    this.showPopup = true;
    this.popupDecision = '';
  }

  closePopup(): void {
    this.showPopup = false;
  }

  updateStatus(): void {
    if (this.selectedCandidature) {
      this.candidatureService.updateCandidatureStatus(this.selectedCandidature.id!, Status.TO_BE_CONVOKED)
        .subscribe(
          (updatedCandidature) => {
            // Mise à jour locale de la candidature pour un rendu immédiat
            this.selectedCandidature!.status = updatedCandidature.status;
            this.showPopup = false; // Fermer la popup après mise à jour
          },
          (error) => {
            console.error("Erreur lors de la mise à jour du statut :", error);
            alert("Une erreur est survenue lors de la mise à jour du statut !");
          }
        );
    }
  }


  filterCandidatures(): Candidature[] {
    return this.candidatures.filter((candidature) =>
      (this.selectedPoste ? candidature.job.title === this.selectedPoste : true) &&
      (this.selectedStatut ? candidature.status === this.selectedStatut : true) &&
      [Status.CONVOKED, Status.TO_BE_CONVOKED, Status.PENDING].includes(candidature.status)
    );
  }

   getStatusDisplay(status: Status): string {
    return status.valueOf().replace('_', ' ').toUpperCase().replace(/\b\w/g, l => l.toUpperCase());
  }
}
