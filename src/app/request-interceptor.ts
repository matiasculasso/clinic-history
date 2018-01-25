import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { BaseRequestOptions, RequestOptions, RequestOptionsArgs } from '@angular/http';

import { OidcSecurityService } from 'angular-auth-oidc-client';

@Injectable()
export class RequestInterceptor implements HttpInterceptor {

    constructor() {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token = localStorage.getItem('authorizationData');
        // console.log('sending header, token: ', token);
        // request.headers.append('Authorization', 'Bearer ' + token);
        // console.log('Bearer ' + token);
        // console.log(request.headers);
        return next.handle(request);
    }
}

@Injectable()
export class RequestOptionsService extends BaseRequestOptions {
  constructor() {
    super();
    this.headers.set('Content-Type', 'application/vnd.api+json');
  }
  merge(options?: RequestOptionsArgs): RequestOptions {
    const newOptions = super.merge(options);
    console.log('test');
    newOptions.headers.set('Authorization',
                           `Bearer ${localStorage.getItem('authorizationData')}`);
    console.log(newOptions);
    return newOptions;
  }
}
