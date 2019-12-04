import { Creditor, Debt, Debtor, Immovable, Movement, Paid } from '@app/@core/models';

export interface Solicitude {
  id?: number;
  debtor_id?: number;
  creditor_id?: number;
  immovable_id?: number;
  start_date?: string;
  final_date?: string;
  type?: string;
  state?: string;
  adjustment?: number;
  initial_balance?: number;
  capital?: number;
  current_balance?: number;
  consecutive?: number;
  interest?: number;
  commission?: number;
  fee_admin?: number;
  mortgage_percent?: number;
  promissory_pays?: number[];
  debtor?: Debtor;
  creditor?: Creditor;
  immovable?: Immovable;
  movements?: Movement[];
  paids?: Paid[];
  debts?: Debt[];
}
