import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';

@Injectable()
export class SeatAllocationService {

    private _fetchRequests = environment.fetchRequests;

    constructor(private _http: Http) { }

    public fetchRequests(): Observable<any> {
        return this._http.get(this._fetchRequests)
            .pipe(
                map((response: Response) => <any>response.json()),
                tap(response => console.log('end progress bar here')),
                catchError(this.handleError)
            );
    }

    private handleError(error: Response) {
        // in a real world app, we may send the server to some remote logging infrastructure
        // instead of just logging it to the console
        return Observable.throw(error.json().error || 'Server error');
    }
}
