import { Component, OnInit, OnDestroy } from '@angular/core';

import { OidcSecurityService } from 'angular-auth-oidc-client';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit, OnDestroy {

  constructor(public oidcSecurityService: OidcSecurityService) {
    if (this.oidcSecurityService.moduleSetup) {
        this.doCallbackLogicIfRequired();
    } else {
        this.oidcSecurityService.onModuleSetup.subscribe(() => {
            this.doCallbackLogicIfRequired();
        });
    }
  }

  ngOnInit() {
  }

  ngOnDestroy(): void {
      this.oidcSecurityService.onModuleSetup.unsubscribe();
  }

  login() {
      this.oidcSecurityService.authorize();
  }

  private doCallbackLogicIfRequired() {
      if (window.location.hash) {
          this.oidcSecurityService.authorizedCallback();
      }
  }
}
