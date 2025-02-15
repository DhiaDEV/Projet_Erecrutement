import { Candidature } from "./CandidatureObject";
import { User } from "./UserObject";

export interface Interview {
  id?: number;
  date: Date;
  location: string;
  motif: string;
  phase: string;
  candidature: Candidature;
  manager: User;
  rh?: User;
}

export function createEmptyInterview(): Interview {
  return {
    date: new Date(),
    location: "",
    motif: "",
    phase:"", // Phase initiale par défaut
    candidature: {} as Candidature,
    manager: {} as User,
    rh: {} as User
  };
}
