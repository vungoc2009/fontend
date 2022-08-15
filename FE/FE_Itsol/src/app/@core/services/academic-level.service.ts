import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import {AcademicLevel} from '../models/academic-level';


@Injectable({
  providedIn: 'root',
})
export class AcademicLevelService {

  private baseURL = `${environment.apiUrl}public/academic-level`;

  constructor(private httpClient: HttpClient) { }

  getAcademicLevelList(): Observable<AcademicLevel[]>{
    return this.httpClient.get<AcademicLevel[]>(`${this.baseURL}`);
  }

  getAcademicLevelById(id: number): Observable<AcademicLevel>{
    return this.httpClient.get<AcademicLevel>(`${this.baseURL}/${id}`);
  }


}
