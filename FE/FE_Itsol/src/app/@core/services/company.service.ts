import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import {environment} from '../../../environments/environment';
const httpOptions = {
  headers: new HttpHeaders({
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'Content-Type': 'application/json',
    // eslint-disable-next-line @typescript-eslint/naming-convention
    Authorization:'Bearer '+localStorage.getItem('auth-token'),
  }),
};
@Injectable({
  providedIn: 'root',
})
export class CompanyService {
  private readonly baseUrl = `${environment.apiUrl}public`;
  constructor(private http: HttpClient) {
  }

  getCompanyById(id: any): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/home/get-company/${id}`);
  }

  updateCompany(company: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/home/company-edit`,company);
  }
  viewImage(id: number): Observable<any>{
    return this.http.get(`${this.baseUrl}/image/`+id);
  }

  uploadImage(data,avatar): Observable<any>{
    return this.http.post(`${this.baseUrl}/upload/image/`+avatar,data);
  }
}
