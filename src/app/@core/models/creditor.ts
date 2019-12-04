import { City } from '@app/@core/models/city';

export interface Creditor {
  id?: number;
  city_id?: number;
  name?: string;
  phone?: string;
  cell_phone?: string;
  address?: string;
  document?: string;
  email?: string;
  account_name?: string;
  account_number?: string;
  portfolio_management?: string;
  personally_claim?: string;
  city?: City;
}
