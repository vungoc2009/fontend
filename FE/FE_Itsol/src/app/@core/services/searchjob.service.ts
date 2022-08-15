import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import {searchJob} from '../models/searchJob';

@Injectable({
  providedIn: 'root',
})
export class SearchjobService {

  private readonly baseUrl = `${environment.apiUrl}public/searchJob`;

  constructor(private httpClient: HttpClient) { }

  // eslint-disable-next-line @typescript-eslint/no-shadow
  searchJob(searchJob: searchJob, page: number): Observable<object>{
    return this.httpClient.post(this.baseUrl,searchJob, {
      params: {
        pageNumber: page,
      },
      },
    );
    }
}
