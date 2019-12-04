import * as c from './data/cities.json';
import { City } from '@app/@core/models';

const cities: City[] = c.default.cities;

export function getCitiesFactory() {
  return cities;
}
