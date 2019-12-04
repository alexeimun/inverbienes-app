import { EndPointInterface } from '../api/end-point';

export class ConfigPlatform {
  readonly AUTH_CLIENT_ID: string;
  readonly AUTH_CLIENT_SECRET: string;
  readonly AUTH_GOOGLE_CLIENT_ID: string;
  readonly API_BASE_URL: string;
  readonly BASE_URL: string;
  readonly ID_CHROME: string;
  readonly APICONFIG: ApiConfig;
}

export class ApiConfig {
  env: string;
  base: string;
  endPoints: EndPoints;
  identify: string;
  subdomains: { local: string, test: string, production: string };
}

export class EndPoints {
  [endPoint: string]: EndPointInterface;
}
