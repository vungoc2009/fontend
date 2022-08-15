import {Injectable} from '@angular/core';
import {environment} from '../../../../environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Job} from "../../../@core/models/job";

@Injectable({
  providedIn: 'root',
})
export class ManagerJeService{

  private  readonly managerAPI = `${environment.apiUrl}auth/pageje`;
  private  readonly managerAPI1 = `${environment.apiUrl}auth/deactive/`;
  private  readonly managerAPI2 = `${environment.apiUrl}auth/je/`;
  private  httpOptions = {
    headers: new HttpHeaders({
      // eslint-disable-next-line @typescript-eslint/naming-convention
      'Content-Type':  'application/json',
      // eslint-disable-next-line @typescript-eslint/naming-convention
      Authorization: 'my-auth-token',
    }),
  };
  constructor(private http: HttpClient) { }

  getContactJE(): Observable<any>{
    return this.http.get<any>(`${environment.apiUrl}auth/je`);
  }

  getJe(pram, pram1): Observable<any>{
    return this.http.get<any>(`${this.managerAPI}?pageNo=` + pram + `&pageSize=`+ pram1);
  }
  getJeSort(pram, pram1 , sort, type): Observable<any>{
    return this.http.get<any>(`${this.managerAPI}?pageNo=` + pram + `&pageSize=`+ pram1 + `&sort=`+sort + `&type=`+type );
  }

  deactive(id: number): Observable<any>{
    return this.http.put(this.managerAPI1+ id , this.httpOptions);
  }

  getNumberJe(): Observable<any>{
    return this.http.get(`${this.managerAPI2}`);
  }
}
