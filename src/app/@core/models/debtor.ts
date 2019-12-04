import { City } from '@app/@core/models/city';

export interface Debtor {
  id?: number;
  city_id?: number;
  name?: string;
  phone?: string;
  cell_phone?: string;
  address?: string;
  document?: string;
  email?: string;
  attendant?: string;
  city?: City;
}
