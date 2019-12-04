import { Creditor, Solicitude } from '@app/@core/models';

export interface CreditorReport {
  mortgages: Solicitude[];
  creditor: Creditor;
}
