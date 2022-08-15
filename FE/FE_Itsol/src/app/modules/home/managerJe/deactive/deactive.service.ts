import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../../../../environments/environment';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root',
}) export class DeactiveService{
  private  readonly managerAPI = `${environment.apiUrl}auth/pageje`;

  private  httpOptions = {
    headers: new HttpHeaders({
      // eslint-disable-next-line @typescript-eslint/naming-convention
      'Content-Type':  'application/json',
      // eslint-disable-next-line @typescript-eslint/naming-convention
      Authorization: 'my-auth-token',
    }),
  };

  constructor(private http: HttpClient) { }
  getJe(pram, pram1): Observable<any>{
    return this.http.get<any>(`${this.managerAPI}?pageNo=` + pram + `&pageSize=`+ pram1);
  }
}
