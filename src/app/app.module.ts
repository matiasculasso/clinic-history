import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from './core/core.module';

import { AuthModule, OidcSecurityService, OpenIDImplicitFlowConfiguration } from 'angular-auth-oidc-client';

import { PatientsModule } from './patients/patients.module';
import { ConfigService } from './config.service';

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
    PatientsModule
  ],
  providers: [ConfigService, OidcSecurityService],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(private oidcSecurityService: OidcSecurityService, private configService: ConfigService) {

    const openIDImplicitFlowConfiguration = this.configService.GetOpenIdConfig();
    this.oidcSecurityService.setupModule(openIDImplicitFlowConfiguration);
  }
 }
