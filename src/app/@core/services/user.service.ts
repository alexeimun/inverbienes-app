import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { getRegisterEndPoint } from '@app/@core';
import { User } from '@app/@core/models';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {
  }

  fetchUsers(): Observable<User> {
    return this.http.get(getRegisterEndPoint('user',
      {frags: {childrens: [{path: 'users/all'}]}}));
  }

  me(): Observable<any> {
    return this.http.get(getRegisterEndPoint('auth', {frags: {childrens: [{path: 'me'}]}}));
  }

  save(user: User): Observable<User> {
    return this.http.put(getRegisterEndPoint('user'), user);
  }

  create(user: User): Observable<User> {
    return this.http.post(getRegisterEndPoint('user',
      {frags: {childrens: [{path: 'users/create'}]}}), user);
  }

  destroy(id: number): Observable<any> {
    return this.http.delete(getRegisterEndPoint('user',
      {frags: {childrens: [{path: 'users/delete/', id}]}}));
  }

  loginAuth(objData: Object): Observable<User> {
    return this.http.post(getRegisterEndPoint('auth', {frags: {childrens: [{path: 'login'}]}}), objData);
  }

}
