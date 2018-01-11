import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

import { HomeComponent } from './core/home/home.component';
import { PatientsBrowseComponent } from './patients/patients-browse/patients-browse.component';
import { PatientsEditComponent } from './patients/patients-edit/patients-edit.component';

const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent},
  { path: 'patients', component: PatientsBrowseComponent },
  { path: 'patients/new', component: PatientsEditComponent },
  { path: 'patients:id/edit', component: PatientsEditComponent },
  { path: '**', redirectTo: 'home' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes, {preloadingStrategy: PreloadAllModules})
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
