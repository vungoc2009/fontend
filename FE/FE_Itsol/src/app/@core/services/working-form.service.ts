import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import {WorkingForm} from '../models/working-form';


@Injectable({
  providedIn: 'root',
})
export class WorkingFormService {

  private baseURL = `${environment.apiUrl}public/working-form`;

  constructor(private httpClient: HttpClient) { }

  getWorkingFormList(): Observable<WorkingForm[]>{
    return this.httpClient.get<WorkingForm[]>(`${this.baseURL}`);
  }

  getWorkingFormById(id: number): Observable<WorkingForm>{
    return this.httpClient.get<WorkingForm>(`${this.baseURL}/${id}`);
  }


}
