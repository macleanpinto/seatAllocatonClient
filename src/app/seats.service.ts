import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SeatsService {
  private _saveSeatsTemplate = environment.saveSeatTemplateUrl;
  private _fetchTemplate = environment.retrieveSeatUrl;

    constructor(private _httpClient: HttpClient) { }
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

  public fetchTemplateService() {
      if (!environment.production) {
          const floorId = '2';
          const wingId = 'C1';
          const bayName = 'Bay1';
          let httpParams = new HttpParams();
          httpParams = httpParams.append('floorId', floorId).append('wingId', wingId).append('bayName', bayName);
          console.log(httpParams);
          return this._httpClient.get(this._fetchTemplate, {
              params: httpParams
          });
      }

  }

}
