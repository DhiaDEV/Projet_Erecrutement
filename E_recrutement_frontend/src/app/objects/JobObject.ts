export interface Job {
  id?: number;  // ID facultatif car il est généré automatiquement par la base de données
  title: string;
  description: string;
  department: string;
  openPositions: number;
}
