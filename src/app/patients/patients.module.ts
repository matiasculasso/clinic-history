import { RequestOptions } from '@angular/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from '../app-routing.module';

import { MomentModule } from 'angular2-moment';
import { NgxSelectModule } from 'ngx-select-ex';

import { AgePipe } from '../pipes/agePipe';
import { HighlightPipe } from '../pipes/highlightPipe';
import { PatientsBrowseComponent } from './patients-browse/patients-browse.component';
import { PatientsEditComponent } from './patients-edit/patients-edit.component';

import * as moment from 'moment';
import * as toastr from 'toastr';

moment.locale('es-Es');

toastr.options.positionClass = 'toast-bottom-right';
toastr.options.newestOnTop = false;

@NgModule({
  declarations: [
    PatientsBrowseComponent,
    PatientsEditComponent,
    AgePipe,
    HighlightPipe
  ],
  imports: [
    AppRoutingModule,
    HttpClientModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MomentModule,
    NgxSelectModule
  ],
  exports: [
    PatientsBrowseComponent,
    PatientsEditComponent
  ],
  providers: [],
})
export class PatientsModule {}
