import * as platform from '../../../../.env.json';
import * as _api from '../../../../config/api/api-endpoints.json';
import { merge } from '../helpers';

const api = _api.default;
const ENV = merge(platform.default, {api});
if (ENV) {
  console.log('Environment load: [develop]');
  console.log(ENV);
}

export function config(key: string) {

  const config: any = ENV[key];

  if (!config) {
    throw new Error(`config not found :: identify [${key}]`);
  }

  return config;
}
