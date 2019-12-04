import { Solicitude } from '@app/@core/models';

export interface Movement {
  id?: number;
  mortgage_id?: number;
  invoice_id?: number;
  mortgage?: Solicitude;
  concept?: string;
  value?: number;
  consecutive?: number;
  month?: number;
  type?: number;
  period_extension?: string;
  created_at?: string;
}
