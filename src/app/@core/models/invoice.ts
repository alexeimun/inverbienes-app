import { Company, Movement, Solicitude, User } from '@app/@core/models';

export interface Invoice {
  id?: number;
  company?: Company;
  mortgage_id?: number;
  user_id?: any;
  bank?: string;
  pay_type: number;
  capital: number;
  total: number;
  cancelled_date?: string;
  check?: string;
  consecutive?: number;
  mortgage?: Solicitude;
  movements?: Movement[];
  user?: User;
  created_at?: string;
}
