import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { getRegisterEndPoint } from '..';
import { Observable } from 'rxjs/Observable';
import { Company } from '@app/@core/models';
import { CommonService } from '@app/@core/interfaces';

@Injectable({
  providedIn: 'root'
})
export class CompanyService implements CommonService{
  constructor(private http: HttpClient) {
  }

  save(data: Company): Observable<Company> {
    return this.http.put<Company>(getRegisterEndPoint('company'), data);
  }

  fetch(): Observable<Company> {
    return this.http.get<Company>(getRegisterEndPoint('company'));
  }

  getConsecutives(): Observable<Company> {
    return this.http.get<Company>(getRegisterEndPoint('company', {
      frags: {id: 'consecutive'}
    }));
  }

  saveConsecutives(consecutives: any): Observable<Company> {
    return this.http.post<any>(getRegisterEndPoint('company', {
      frags: {id: 'consecutive'}
    }), consecutives);
  }

  delete(id: number): Observable<any> {
    return undefined;
  }

  fetchAll() {
  }

  fetchOne(id: number) {
  }

}
