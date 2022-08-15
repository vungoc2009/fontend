import { Injectable } from '@angular/core';
import {HttpClient, HttpRequest} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Job } from '../models/job';

@Injectable({
  providedIn: 'root',
})
export class JobService {

  private baseURL = `${environment.apiUrl}public/job`;
  private readonly profileAPI = `${environment.apiUrl}auth/getuser/`;

  constructor(private httpClient: HttpClient) { }

 /* getJobList(): Observable<Job[]>{
    return this.httpClient.get<Job[]>(`${this.baseURL}`);
  }*/

  getJobPage(param, param1): Observable<Job[]> {
    console.log(this.baseURL);
    return this.httpClient.get<Job[]>(`${this.baseURL}?pageNo=` + param + `&pageSize=` + param1);
  }

  getListSort(param,param1, sort,type): Observable<any> {
    return this.httpClient.get(`${this.baseURL}?pageNo=` + param + `&pageSize=` + param1 + `&sort=` + sort + `&type=` + type);
  }

  searchJob(keyword: String): Observable<any> {
    return this.httpClient.get<Job[]>(`${this.baseURL}/search?keyword=` + keyword);
  }

  createJob(job: Job): Observable<any>{
    return this.httpClient.post(`${this.baseURL}/insert`, job);
  }

  getJobById(id: number): Observable<Job>{
    return this.httpClient.get<Job>(`${this.baseURL}/`+id);
  }

  getProfile(username: any): Observable<any>{
    return this.httpClient.get<any>(this.profileAPI + username);
  }

  updateJob(id: number, job: Job): Observable<any> {
    return this.httpClient.put(`${this.baseURL}/update/${id}`, job);
  }

  updateJobStatus(id: number, idStatus: number): Observable<any> {
    return this.httpClient.put(`${this.baseURL}/updateStatus?id=` + id + `&idStatus=` + idStatus, id);
  }


  deleteJobById(id: number): Observable<any> {
    return this.httpClient.delete(`${this.baseURL}/delete/${id}`);
  }

}
