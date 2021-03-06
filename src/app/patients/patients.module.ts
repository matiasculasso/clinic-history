import { RequestOptions } from '@angular/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from '../app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MomentModule } from 'angular2-moment';
import { NgxSelectModule } from 'ngx-select-ex';

import { AgePipe } from '../pipes/agePipe';
import { HighlightPipe } from '../pipes/highlightPipe';
import { PatientsBrowseComponent } from './patients-browse/patients-browse.component';
import { PatientsEditComponent } from './patients-edit/patients-edit.component';
import { ConsultationComponent } from './consultations/consultation.component';
import { ConsultationHistoryComponent } from './consultations/consultation-history.component';
import { DialogComponent } from '../controls/dialog.component';
import { ComplementsComponent } from './complements/complements.component';

import * as moment from 'moment';
import * as toastr from 'toastr';


moment.locale('es-Es');

toastr.options.positionClass = 'toast-bottom-right';
toastr.options.newestOnTop = false;

@NgModule({
  declarations: [
    PatientsBrowseComponent,
    PatientsEditComponent,
    ConsultationComponent,
    ConsultationHistoryComponent,
    AgePipe,
    HighlightPipe,
    DialogComponent,
    ComplementsComponent
  ],
  imports: [
    AppRoutingModule,
    HttpClientModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MomentModule,
    NgxSelectModule,
    BrowserAnimationsModule,
  ],
  exports: [
    PatientsBrowseComponent,
    PatientsEditComponent
  ],
  providers: [],
})
export class PatientsModule {}
