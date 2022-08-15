import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import {JobPosition} from '../models/job-position';


@Injectable({
  providedIn: 'root',
})
export class JobPositionService {

  private baseURL = `${environment.apiUrl}public/job-position`;

  constructor(private httpClient: HttpClient) { }

  getJobPositionList(): Observable<JobPosition[]>{
    return this.httpClient.get<JobPosition[]>(`${this.baseURL}`);
  }

  getJobPostionById(id: number): Observable<JobPosition>{
    return this.httpClient.get<JobPosition>(`${this.baseURL}/${id}`);
  }


}
