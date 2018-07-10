
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

import { OidcSecurityService } from 'angular-auth-oidc-client';
import { Observable } from 'rxjs/Observable';
import { environment } from '../environments/environment.prod';


import * as moment from 'moment';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private oidcSecurityService: OidcSecurityService, private router: Router) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
    if (environment.production === false) {
      return true;
    }

    if (this.isAutorized()) {
      return true;
    }

    this.oidcSecurityService.authorize();
    this.router.navigate(['/']);
    return false;
  }

  public isAutorized(): boolean {
    let userData: any;
    this.oidcSecurityService.getUserData()
      .subscribe( data => { userData = data; });
    return this.checkIfAutorized(userData);
  }

  private checkIfAutorized(userData: any): boolean {
    const authTime = userData['auth_time'] || 0;
    const expirationTime = authTime + 3600;
    const currentTimeIsSeconds =  Math.round(moment.now() / 1000);
    if (expirationTime > currentTimeIsSeconds) {
      return true;
    }
    return false;
  }
}

