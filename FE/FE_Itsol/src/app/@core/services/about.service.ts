import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import {Job} from '../models/job';
import {Company} from '../models/company';

@Injectable({
  providedIn: 'root',
})
export class AboutService {

  private readonly baseUrl = `${environment.apiUrl}public/aboutus`;

  constructor(private httpClient: HttpClient) { }

  getCompany(): Observable<Company>{
    return this.httpClient.get<Company>(`${this.baseUrl}`);
  }

}
