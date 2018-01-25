import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

import { HomeComponent } from './core/home/home.component';
import { PatientsBrowseComponent } from './patients/patients-browse/patients-browse.component';
import { PatientsEditComponent } from './patients/patients-edit/patients-edit.component';
import { AuthGuard } from './auth-guar.service';

const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent},
  { path: 'patients', component: PatientsBrowseComponent, canActivate: [AuthGuard] },
  { path: 'patients/new', component: PatientsEditComponent, canActivate: [AuthGuard] },
  { path: 'patients:id/edit', component: PatientsEditComponent, canActivate: [AuthGuard] },
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
