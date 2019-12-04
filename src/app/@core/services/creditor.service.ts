import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { getRegisterEndPoint } from '..';
import { Observable } from 'rxjs/Observable';
import { CommonService } from '@app/@core/interfaces';
import { Creditor } from '@app/@core/models';
import { CreditorReport } from '@app/@core/models/creditor-report';

@Injectable({
  providedIn: 'root'
})
export class CreditorService implements CommonService {
  constructor(private http: HttpClient) {
  }

  save(data: Creditor): Observable<Creditor> {
    return this.http.post<Creditor>(getRegisterEndPoint('creditor'), data);
  }

  fetchAll(): Observable<Creditor[]> {
    return this.http.get<Creditor[]>(getRegisterEndPoint('creditor'));
  }

  fetchOne(id: number): Observable<Creditor> {
    return this.http.get<Creditor>(getRegisterEndPoint('creditor', {frags: {id}}));
  }

  delete(id: number): Observable<any> {
    return this.http.delete(getRegisterEndPoint('creditor', {frags: {id}}));
  }

  fetchReport(params: { creditor_id: number, from: number, to: number }): Observable<CreditorReport> {
    return this.http.get<CreditorReport>(getRegisterEndPoint('report', {
      frags: {
        childrens: [
          {path: 'creditor', id: params.creditor_id},
          {id: params.from}, {id: params.to}]
      }
    }));
  }

  transfer(data: any): Observable<any> {
    return this.http.post(getRegisterEndPoint('credit-session', {frags: {id: 'creditor'}}), data);
  }
}
