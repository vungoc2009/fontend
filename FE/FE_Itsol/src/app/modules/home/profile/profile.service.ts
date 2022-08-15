import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable, OnInit} from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';



@Injectable({
  providedIn: 'root',
})
export class ProfileService {
private  httpOptions = {
    headers: new HttpHeaders({
      // eslint-disable-next-line @typescript-eslint/naming-convention
      'Content-Type':  'application/json',
      // eslint-disable-next-line @typescript-eslint/naming-convention
      Authorization: 'my-auth-token',
    }),
  };
  private readonly profileAPI = `${environment.apiUrl}auth/getuser/`;
  private readonly profileAPI1 = `${environment.apiUrl}auth/update/`;
  private readonly profileAPI2 = `${environment.apiUrl}auth/upload/image/`;
  private readonly profileAPI3 = `${environment.apiUrl}auth/image/`;

  constructor(private http: HttpClient) { }

  picture;
  getProfile(username: any): Observable<any>{
    return this.http.get<any>(this.profileAPI + username);
  }

  updateUser(id: any, user: any): Observable<any>{
    return  this.http.put(this.profileAPI1 + id,user,this.httpOptions);
  }

  uploadImage(data,avatar): Observable<any>{
    return this.http.post(this.profileAPI2+ avatar, this.httpOptions );
  }

  viewImage(name: string): Observable<any>{
    return this.http.get(this.profileAPI3 + name, this.httpOptions);
  }
  tranferData(picture){
    this.picture=picture;
  }
}
