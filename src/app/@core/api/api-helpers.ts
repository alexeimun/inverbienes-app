import { config } from '../config/config';
import { EndPoint, EndPointInterface, EndPointsOptions } from './end-point';

export function getRegisterEndPoint(name: string, options: EndPointsOptions = null) {
  const endPoint: EndPoint = getEndPoint(name);
  return endPoint.getUrl(options);
}

function getEndPoint(name: string): EndPoint {
  const _baseEndPoint: EndPointInterface = config('api').endPoints[name];

  if (!_baseEndPoint) {
    console.warn(`End point not found :: identify = ${name}`);
  }

  return new EndPoint(_baseEndPoint);
}
