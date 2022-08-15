import {Injectable} from '@angular/core';
import {environment} from '../../../../../environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root',
}) export  class  EditJeService{
  private  httpOptions = {
    headers: new HttpHeaders({
      // eslint-disable-next-line @typescript-eslint/naming-convention
      'Content-Type':  'application/json',
      // eslint-disable-next-line @typescript-eslint/naming-convention
      Authorization: 'my-auth-token',
    }),
  };
  private  readonly managerAPI = `${environment.apiUrl}auth/user/`;
  private readonly profileAPI1 = `${environment.apiUrl}auth/update/`;
  constructor(private  http: HttpClient) {}
  getJe(id): Observable<any>{
    return this.http.get<any>(`${this.managerAPI}`+id);
  }
  updateUser(id: any, user: any): Observable<any>{
    return  this.http.put(this.profileAPI1 + id,user,this.httpOptions);
  }
}
