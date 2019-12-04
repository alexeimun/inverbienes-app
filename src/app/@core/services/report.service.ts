import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { getRegisterEndPoint } from '..';
import { Observable } from 'rxjs/Observable';
import { CreditorDebtor, Movement } from '@app/@core/models';

@Injectable({
  providedIn: 'root'
})
export class ReportService {
  constructor(private http: HttpClient) {
  }

  fetchDailyIncomes(date: string): Observable<Movement[]> {
    return this.http.get<Movement[]>(getRegisterEndPoint('report', {
      frags: {childrens: [{path: 'daily_incomes', id: date}]}
    }));
  }

  fetchDailyBlock(start_date: string, end_date: string): Observable<{ movements: Movement[], consecutive: number }> {
    return this.http.get<{ movements: Movement[], consecutive: number }>(getRegisterEndPoint('report', {
      frags: {childrens: [{path: 'daily_block', id: start_date}, {id: end_date}]}
    }));
  }

  fetchCreditorDebtor(start_date: string, end_date: string): Observable<CreditorDebtor[]> {
    return this.http.get<CreditorDebtor[]>(getRegisterEndPoint('report', {
      frags: {childrens: [{path: 'creditor_debtor', id: start_date}, {id: end_date}]}
    }));
  }

}
