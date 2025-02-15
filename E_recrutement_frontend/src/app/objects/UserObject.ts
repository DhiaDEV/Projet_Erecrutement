export enum UserRole {
  RH = 'RH',
  MANAGER = 'MANAGER'
}

export interface User {
  id?: number;  // ID facultatif car il est généré automatiquement
  name: string;
  email: string;
  password?: string;  // Facultatif pour éviter d'exposer le mot de passe
  role: UserRole;
}
