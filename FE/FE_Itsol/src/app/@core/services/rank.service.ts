import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import {Rank} from '../models/rank';


@Injectable({
  providedIn: 'root',
})
export class RankService {

  private baseURL = `${environment.apiUrl}public/rank`;

  constructor(private httpClient: HttpClient) { }

  getRankList(): Observable<Rank[]>{
    return this.httpClient.get<Rank[]>(`${this.baseURL}`);
  }

  getRankById(id: number): Observable<Rank>{
    return this.httpClient.get<Rank>(`${this.baseURL}/${id}`);
  }


}
