import { Interview } from "./InterviewObject";

export enum Rating {
  FAIBLE = 'FAIBLE',
  PASSABLE = 'PASSABLE',
  BIEN = 'BIEN'
}


export function createEmptyFeedback(): Feedback {
  return {
    rating: Rating.BIEN, // Default rating
    feedback: "", // Empty feedback text
    interview: {} as Interview, // Empty interview object
  };
}
export interface Feedback {
  id?: number;  // ID facultatif car il est généré automatiquement
  rating: Rating;
  feedback: string;
  interview: Interview;  // Référence à l'entretien associé
}

