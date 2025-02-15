import { Interview } from './InterviewObject';
import { Job } from './JobObject';

export enum Status {
  CONVOKED = 'CONVOKED',
  TO_BE_CONVOKED = 'TO_BE_CONVOKED',
  ACCEPTED = 'ACCEPTED',
  REJECTED = 'REJECTED',
  PENDING = 'PENDING'
}

export interface Candidature {
  id?: number;
  name: string;
  email: string;
  cv?: Uint8Array;
  applicationDate: Date;
  status: Status;
  interviews?: Interview[];
  job: Job;
}
