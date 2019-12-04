import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { getRegisterEndPoint } from '..';
import { Observable } from 'rxjs/Observable';
import { CommonService } from '@app/@core/interfaces';
import { Debtor, DebtorReport } from '@app/@core/models';

@Injectable({
  providedIn: 'root'
})
export class DebtorService implements CommonService {
  constructor(private http: HttpClient) {
  }

  save(data: Debtor): Observable<Debtor> {
    return this.http.post<Debtor>(getRegisterEndPoint('debtor'), data);
  }

  fetchAll(): Observable<Debtor[]> {
    return this.http.get<Debtor[]>(getRegisterEndPoint('debtor'));
  }

  fetchOne(id: number): Observable<Debtor> {
    return this.http.get<Debtor>(getRegisterEndPoint('debtor', {frags: {id}}));
  }

  fetchReport(params: { debtor_id: number, from: number, to: number }): Observable<DebtorReport> {
    return this.http.get<DebtorReport>(getRegisterEndPoint('report', {
      frags: {
        childrens: [
          {path: 'debtor', id: params.debtor_id},
          {id: params.from}, {id: params.to}]
      }
    }));
  }

  delete(id: number): Observable<any> {
    return this.http.delete(getRegisterEndPoint('debtor', {frags: {id}}));
  }

  transfer(data: any): Observable<any> {
    return this.http.post(getRegisterEndPoint('credit-session', {frags: {id: 'debtor'}}), data);
  }

}
