import { Component } from '@angular/core';
import { ListeCandidaturesComponent } from "../liste-candidatures/liste-candidatures.component";
import { Candidature, Status } from 'src/app/objects/CandidatureObject';

@Component({
  selector: 'app-candidature-filtrees',
  templateUrl: './candidature-filtrees.component.html',
  styleUrls: ['./candidature-filtrees.component.scss']
})
export class CandidatureFiltreesComponent extends ListeCandidaturesComponent {
  // Make Status enum available in the template
  override Status = Status;

  // Redéfinition des statuts disponibles
  override statuts: (Status | 'Tous Les Status')[] = ['Tous Les Status', Status.ACCEPTED, Status.REJECTED];

  // Nouvelle méthode de filtrage
  override filterCandidatures(): Candidature[] {
    return this.candidatures.filter((candidature) => {
      const filtrePoste = this.selectedPoste
        ? candidature.job.title === this.selectedPoste
        : true;

      const filtreStatut = this.selectedStatut
        ? candidature.status === this.selectedStatut
        : [Status.ACCEPTED, Status.REJECTED].includes(candidature.status);

      return filtrePoste && filtreStatut;
    });
  }

  // Mise à jour des labels
  override selectOption(dropdown: string, value: string | Status): void {
    super.selectOption(dropdown, value);

    if (dropdown === 'dropdown1') {
      this.dropdownPosteLabel = value === 'Tous Les Postes'
        ? 'Filtrage Par Poste'
        : value as string;
    }
    if (dropdown === 'dropdown2') {
      this.dropdownStatutLabel = value === 'Tous Les Status'
        ? 'Filtrage Par Status'
        : this.getStatusDisplay(value as Status);
    }
  }

  // Helper method to display Status enum values
  override getStatusDisplay(status: Status): string {
    return status.valueOf().replace('_', ' ').toUpperCase().replace(/\b\w/g, l => l.toUpperCase());
  }
}
