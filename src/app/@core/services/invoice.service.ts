import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { getRegisterEndPoint } from '..';
import { Observable } from 'rxjs/Observable';
import { CommonService } from '@app/@core/interfaces';
import { Invoice } from '@app/@core/models';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService implements CommonService {
  constructor(private http: HttpClient) {
  }

  save(data: any): Observable<number> {
    return this.http.post<number>(getRegisterEndPoint('invoice'), data);
  }

  fetchAll(): Observable<Invoice[]> {
    return this.http.get<Invoice[]>(getRegisterEndPoint('invoice'));
  }

  fetchPayments(id: number): Observable<any> {
    return this.http.get<any>(getRegisterEndPoint('payment', {frags: {id}}));
  }

  fetchConsecutive(): Observable<number> {
    return this.http.get<number>(getRegisterEndPoint('invoice', {frags: {id: 'get/consecutive'}}));
  }

  fetchOne(id: number): Observable<Invoice> {
    return this.http.get<Invoice>(getRegisterEndPoint('invoice', {frags: {id}}));
  }

  delete(id: number): Observable<any> {
    return this.http.delete(getRegisterEndPoint('invoice', {frags: {id}}));
  }

  remove(id: number): Observable<any> {
    return this.http.delete(getRegisterEndPoint('invoice', {
      frags: {childrens: [{id, path: 'remove'}]}
    }));
  }

  cancel(id: number): Observable<any> {
    return this.http.put(getRegisterEndPoint('invoice', {
      frags: {childrens: [{id, path: 'cancel'}]}
    }), {});
  }

}
