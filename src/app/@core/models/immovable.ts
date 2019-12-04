import { City, Debtor } from '@app/@core/models';

export interface Immovable {
  id?: number;
  city_id?: number;
  debtor_id?: number;
  address: string;
  phone?: string;
  nearto?: string;
  type?: any;
  writting_number?: string;
  registration?: string;
  writting_delivery?: string;
  constitution?: string;
  notary?: string;
  debtor?: Debtor;
  city?: City;
}
