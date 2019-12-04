import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { getRegisterEndPoint } from '..';
import { Observable } from 'rxjs/Observable';
import { CommonService } from '@app/@core/interfaces';
import { Solicitude } from '@app/@core/models';

@Injectable({
  providedIn: 'root'
})
export class MortgageService implements CommonService {
  constructor(private http: HttpClient) {
  }

  save(data: Solicitude): Observable<Solicitude> {
    return this.http.post<Solicitude>(getRegisterEndPoint('mortgage'), data);
  }

  fetchAll(): Observable<Solicitude[]> {
    return this.http.get<Solicitude[]>(getRegisterEndPoint('mortgage'));
  }

  fetchOne(id: number): Observable<Solicitude> {
    return this.http.get<Solicitude>(getRegisterEndPoint('mortgage', {frags: {id}}));
  }

  delete(id: number): Observable<any> {
    return this.http.delete(getRegisterEndPoint('mortgage', {frags: {id}}));
  }
}
