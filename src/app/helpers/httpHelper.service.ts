import {Injectable} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { OidcSecurityService } from 'angular-auth-oidc-client';
import { GlobalSettings } from '../global-settings';
import { Observable } from 'rxjs/Observable';


@Injectable()

export class HttpHelperService {
   constructor(private http: HttpClient, private oidcSecurityService: OidcSecurityService) {
   }

   public HttpGet(collection: string, filter?: string): Observable<Object[]> {
    const headers = this.addHeaders();

    if (filter) {
      return this.http.get<Object[]>(GlobalSettings.API_ENDPOINT + `${collection}?filter=${filter}`, { headers } );
    }
    return this.http.get<Object[]>(GlobalSettings.API_ENDPOINT + `${collection}`, { headers } );
   }

   public HttpGetEntity(collection: string, id: string): Observable<Object> {
     return this.http.get<Object>(GlobalSettings.API_ENDPOINT + `${collection}/${id}/`, { headers: this.addHeaders() } );
   }

   public HttpPost(collection: string, data: any): Observable<Object> {
    return this.http.post<any>(GlobalSettings.API_ENDPOINT + `${collection}/`, data, { headers: this.addHeaders() } );
  }

  public HttpPut(collection: string, data: any, id: number): Observable<Object> {
    data['id'] = id;
    return this.http.put<any>(GlobalSettings.API_ENDPOINT + `${collection}/`, data, { headers: this.addHeaders() } );
  }

   private addHeaders(): HttpHeaders {
      const oidcToken = this.oidcSecurityService.getToken();
      const headers = new HttpHeaders({
        'Authorization':  `Bearer ${oidcToken}`
      });
      return headers;
   }
}
