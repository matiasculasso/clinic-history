import { NgModule } from '@angular/core';
import { AppRoutingModule } from '../app-routing.module';

import { PatientsBrowseComponent } from './patients-browse/patients-browse.component';
import { PatientsEditComponent } from './patients-edit/patients-edit.component';

@NgModule({
  declarations: [
    PatientsBrowseComponent,
    PatientsEditComponent
  ],
  imports: [
    AppRoutingModule
  ],
  exports: [
    PatientsBrowseComponent,
    PatientsEditComponent
  ],
  providers: [
  ]
})
export class PatientsModule {}
