import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Observable} from 'rxjs';

@Injectable({
  providedIn:'root',
})
export class JobSeeMoreService{
  constructor(private http: HttpClient) {
  }
  // eslint-disable-next-line @typescript-eslint/member-ordering
  private readonly baseUrl = `${environment.apiUrl}`;
  getMoreJob(typeJob: string, page: number): Observable<any> {
    return this.http.get(`${this.baseUrl}public/viewMoreJob/${typeJob}`,{
      params: {
        pageNumber: page,
      },
    });
  }
}
