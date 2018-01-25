import { RequestOptions } from '@angular/http';
import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

import { AppRoutingModule } from '../app-routing.module';

import { PatientsBrowseComponent } from './patients-browse/patients-browse.component';
import { PatientsEditComponent } from './patients-edit/patients-edit.component';
import { RequestInterceptor, RequestOptionsService } from '../request-interceptor';

@NgModule({
  declarations: [
    PatientsBrowseComponent,
    PatientsEditComponent
  ],
  imports: [
    AppRoutingModule,
    HttpClientModule,
    CommonModule
  ],
  exports: [
    PatientsBrowseComponent,
    PatientsEditComponent
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: RequestInterceptor,
      multi: true
    },
    { provide: RequestOptions, useClass: RequestOptionsService }
],
})
export class PatientsModule {}
