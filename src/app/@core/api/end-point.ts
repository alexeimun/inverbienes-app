import { joinUrl } from '../helpers';
import { config } from '../config/config';

export const BASE_PARAMS = ['microservice', 'version', 'uri'];

export interface EndPointInterface {
  base: string;
  uri: string;
  version: string;
  microservice: string;
}

export class EndPointsOptions {
  frags?: RouteFrags;
  queryParams?: any;
}

export class RouteFrags {
  id?: any;
  path?: string;
  childrens?: Array<RouteFrags | string>;
}

export class EndPoint implements EndPointInterface {

  base: string;
  uri: string;
  version: string;
  microservice: string;
  ignoreEnvironment: boolean;

  private _baseUrl: string;

  constructor(endpoint: EndPointInterface = null) {
    this._fill(endpoint);
  }

  getUrl(options: EndPointsOptions = null): string {

    let url: string = this._generateBase();

    if (options) {
      url = this._resolveOptions(url, options);
    }

    return url;
  }

  private _resolveOptions(url: string, options: EndPointsOptions): string {

    const params = options.frags;

    if (params) {
      return this._resolveParams(url, params);
    }
    // TODO: add queryParams;
  }

  private _resolveParams(url: string, routeFrag: RouteFrags): string {

    if (routeFrag.id) {
      url = joinUrl(url, routeFrag.id);
    }

    if (routeFrag.childrens) {
      for (const key of routeFrag.childrens) {
        if (typeof key === 'string') {
          url = joinUrl(url, key);
        } else {
          url = this._joinChildren(url, key);
        }
      }
    }
    return url.replace(/\/$/, '');
  }

  private _joinChildren(url: string, routeFrag: RouteFrags) {
    const children = joinUrl(routeFrag.path, routeFrag.id);
    return joinUrl(url, children);
  }

  private _generateBase(): string {

    if (this._baseUrl) {
      return this._baseUrl;
    }
    let base = this.base ? this.base : config('api').base;
    if (!this.ignoreEnvironment) {
      base = this._addEnvioment(base, config('api').env);
    }

    for (const param of BASE_PARAMS) {
      if (this[param]) {
        base = joinUrl(base, this[param]);
      }
    }
    return this._baseUrl = base;
  }

  private _fill(endPoint: EndPointInterface) {
    for (const key in endPoint) this[key] = endPoint[key];
  }

  private _addEnvioment(base, envioment) {
    const subdomain = this._getSubdomain(envioment);
    if (!subdomain) {
      return base;
    }
    return this._splice(base, subdomain, config('api').identify);
  }

  private _getSubdomain(envioment) {
    switch (envioment) {
      case 'production':
        return config('api').subdomains.production;
      case 'test':
        return config('api').subdomains.test;
      case 'local':
        return config('api').subdomains.local;
      default:
        return '';
    }
  }

  private _splice(base, subdomain, identify) {
    let position = base.indexOf(identify);
    if (position !== -1) {
      position += identify.length;
      return base.substr(0, position) + subdomain + '.' + base.substr(position);
    }
    console.warn('identify :: ' + identify + ' not found in base :: ' + base);
    return base;
  }
}
