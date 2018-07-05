
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

import { OidcSecurityService } from 'angular-auth-oidc-client';
import { Observable } from 'rxjs/Observable';
import { environment } from '../environments/environment.prod';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private oidcSecurityService: OidcSecurityService, private router: Router) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
    if (environment.production === false) {
      return true;
    }

    let isAuthorized;
    this.oidcSecurityService.getIsAuthorized()
      .subscribe(result => { isAuthorized = result; });

    if (isAuthorized) {
      return true;
    }
    this.oidcSecurityService.authorize();
    this.router.navigate(['/']);
    return false;
  }
}

