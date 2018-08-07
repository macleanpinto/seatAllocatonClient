import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable()
export class SeatAllocationService {

    private _fetchRequests = environment.fetchRequests;
    private _fetchLayout = environment.fetchLayout;
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

    public fetchLayout(buildingId: string, floorId: string, bayId: string): Observable<any> {
        const params = new URLSearchParams();
        params.set('buildingId', buildingId);
        params.set('floorId', floorId);
        params.set('bayId', bayId);
        return this._http.get(this._fetchLayout, { search: params })
            .pipe(
                map((response: Response) => <any>response.json()),
                tap(response => console.log('end progress bar here')),
                catchError(this.handleError)
            );
    }

    public saveTemplateService(seats) {
        return this._httpClient.post(this._saveSeatsTemplate, seats);
    }

    private handleError(error: Response) {
        // in a real world app, we may send the server to some remote logging infrastructure
        // instead of just logging it to the console
        return Observable.throw(error.json().error || 'Server error');
    }
}
