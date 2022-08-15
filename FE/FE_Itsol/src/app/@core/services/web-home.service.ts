import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import {Job} from '../models/job';
import {searchJob} from '../models/searchJob';
import {ResponseData} from '../models/ResponseData';

@Injectable({
  providedIn: 'root',
})
export class WebHomeService {

  private readonly baseUrl = `${environment.apiUrl}public/itsol_recruitment`;

  constructor(private http: HttpClient) {
  }
  getAllJob(page: number): Observable<object>{
    return this.http.get(`${this.baseUrl}`,{
      params: {
        pageNumber: page,
      },
    });
  }

}
