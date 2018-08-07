import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable()
export class SeatAllocationService {

    private _fetchRequests = environment.fetchRequests;
    private _saveSeatsTemplate = environment.saveSeatTemplateUrl;

    constructor(private _http: Http, private _httpClient: HttpClient) { }

    public fetchRequests(): Observable<any> {
        return this._http.get(this._fetchRequests)
            .pipe(
                map((response: Response) => <any>response.json()),
                tap(response => console.log('end progress bar here')),
                catchError(this.handleError)
            );
    }

    public saveTemplateService(seats, floorId: string, wingId: string, bayId: string) {
        if (!environment.production) {
            let httpParams = new HttpParams();
            httpParams = httpParams.append('floorId', floorId).append('wingId', wingId).append('bayName', bayId);
            console.log(httpParams);
            return this._httpClient.post(this._saveSeatsTemplate, seats, {
                params: httpParams
          });
      } else {
          return this._httpClient.post(this._saveSeatsTemplate, seats);
      }
  }
    private handleError(error: Response) {
        // in a real world app, we may send the server to some remote logging infrastructure
        // instead of just logging it to the console
        return Observable.throw(error.json().error || 'Server error');
    }
}
