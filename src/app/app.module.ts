import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { AuthModule, OidcSecurityService, OpenIDImplicitFlowConfiguration } from 'angular-auth-oidc-client';
import { MomentModule } from 'angular2-moment';

import { CoreModule } from './core/core.module';
import { PatientsModule } from './patients/patients.module';
import { ConfigService } from './config.service';
import { AuthGuard } from './auth-guar.service';
import { HttpHelperService } from './helpers/httpHelper.service';

import * as moment from 'moment';
import * as toastr from 'toastr';

moment.locale('es-Es');

toastr.options.positionClass = 'toast-bottom-right';
toastr.options.newestOnTop = false;

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AuthModule.forRoot(),
    AppRoutingModule,
    CoreModule,
    PatientsModule,
    MomentModule
  ],
  providers: [ConfigService,
    OidcSecurityService,
    AuthGuard,
    HttpHelperService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(private oidcSecurityService: OidcSecurityService, private configService: ConfigService) {

    const openIDImplicitFlowConfiguration = this.configService.GetOpenIdConfig();
    this.oidcSecurityService.setupModule(openIDImplicitFlowConfiguration);
  }
 }
