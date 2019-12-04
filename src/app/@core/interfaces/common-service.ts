import { Observable } from 'rxjs/Rx';

export interface CommonService {
  fetchAll();

  fetchOne(id: number);

  save(data);

  delete(id: number): Observable<any>;

}
