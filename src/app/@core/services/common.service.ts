import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs/Rx';
import { HttpClient } from '@angular/common/http';
import { getRegisterEndPoint } from '@app/@core';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  private notify = new Subject<any>();
  notifier = this.notify.asObservable();

  constructor(private http: HttpClient) {
  }

  dashboard(): Observable<any> {
    return this.http.get<any>(getRegisterEndPoint('dashboard'));
  }

  debtInterest(): Observable<any> {
    return this.http.get<any>(getRegisterEndPoint('common', {frags: {id: 'debt_interest'}}));
  }

  mortgateEnd(): Observable<any> {
    return this.http.get<any>(getRegisterEndPoint('common', {frags: {id: 'mortgate_end'}}));
  }

  public notifyHeader(data?: any) {
    this.notify.next(data);
  }

}
