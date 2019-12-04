import { Debtor, Solicitude } from '@app/@core/models';
import { PaymentType } from '@app/@core/enums';

export interface DebtorReport {
  mortgages: Solicitude[];
  debtor: Debtor;
}

export interface Paid {
  up_month?: number;
  value?: number;
  concept?: string;
  type?: PaymentType;
}

export interface Debt {
  from_month?: string;
  up_month?: string;
  value?: number;
  concept?: string;
  type?: PaymentType;
}

export interface CreditorDebtor {
  debtor_name?: string;
  creditor_name?: string;
  start_date?: string;
  final_date?: string;
  interest?: number;
  initial_balance?: number;
  capital?: number;
  last_paid?: string;
  debt_months?: string;
}
