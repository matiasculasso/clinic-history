import {Injectable} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { OidcSecurityService } from 'angular-auth-oidc-client';
import { GlobalSettings } from '../global-settings';
import { Observable } from 'rxjs/Observable';


@Injectable()

export class HttpHelperService {
   constructor(private http: HttpClient, private oidcSecurityService: OidcSecurityService) {
   }

   public HttpGet(collection: string, filter: string): Observable<Object[]> {
    const oidcToken = this.oidcSecurityService.getToken();
    const h = new HttpHeaders({
        'Authorization':  `Bearer ${oidcToken}`
      });
      return this.http.get<Object[]>(GlobalSettings.API_ENDPOINT + `${collection}?filter=${filter}`, { headers: h } );
   }
}
