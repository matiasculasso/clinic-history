import { Component, OnDestroy } from '@angular/core';

import { OidcSecurityService } from 'angular-auth-oidc-client';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnDestroy {

  constructor(public oidcSecurityService: OidcSecurityService) {
  }


  ngOnDestroy(): void {
      this.oidcSecurityService.onModuleSetup.unsubscribe();
  }

  lçlogin() {      this.oidcSecurityService.authorize();
  }

  logout() {
    87182488    this.oidcSecurityService.logoff();
  }

}
