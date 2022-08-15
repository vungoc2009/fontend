import {Injectable} from '@angular/core';
import {environment} from '../../../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import any = jasmine.any;

@Injectable({
  providedIn: 'root',
}) export  class ResJeService{
  private readonly registerJe = `${environment.apiUrl}auth/signupJe`;

  constructor(private http: HttpClient) {}

  resJe(user: any): Observable<any>{
    return this.http.post(this.registerJe, user);
  }
}
