import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { getRegisterEndPoint } from '..';
import { Observable } from 'rxjs/Observable';
import { CommonService } from '@app/@core/interfaces';
import { Immovable } from '@app/@core/models';

@Injectable({
  providedIn: 'root'
})
export class ImmovableService implements CommonService {
  constructor(private http: HttpClient) {
  }

  save(data: Immovable): Observable<Immovable> {
    return this.http.post<Immovable>(getRegisterEndPoint('immovable'), data);
  }

  fetchAll(): Observable<Immovable[]> {
    return this.http.get<Immovable[]>(getRegisterEndPoint('immovable'));
  }

  fetchByDebtor(id: number, is_related: boolean): Observable<Immovable[]> {
    return this.http.get<Immovable[]>(getRegisterEndPoint('immovable', {
      frags: {childrens: [{path: 'by_debtor', id}, {id: is_related}]}
    }));
  }

  fetchOne(id: number): Observable<Immovable> {
    return this.http.get<Immovable>(getRegisterEndPoint('immovable', {frags: {id}}));
  }

  delete(id: number): Observable<any> {
    return this.http.delete(getRegisterEndPoint('immovable', {frags: {id}}));
  }
}
