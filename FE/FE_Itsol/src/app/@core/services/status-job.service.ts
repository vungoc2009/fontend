import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import {StatusJob} from '../models/status-job';


@Injectable({
  providedIn: 'root',
})
export class StatusJobService {

  private baseURL = `${environment.apiUrl}public/status-job`;

  constructor(private httpClient: HttpClient) { }

  getStatusJobList(): Observable<StatusJob[]>{
    return this.httpClient.get<StatusJob[]>(`${this.baseURL}`);
  }

  getStatusById(id: number): Observable<StatusJob>{
    return this.httpClient.get<StatusJob>(`${this.baseURL}/${id}`);
  }


}
