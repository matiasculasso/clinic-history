import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';

import { Observable } from 'rxjs/Observable';
import * as moment from 'moment';
import * as toastr from 'toastr';

import { HttpHelperService } from '../../helpers/httpHelper.service';
import { PatiensEditModel } from '../../models/patient-edit-model';



@Component({
  selector: 'app-patients-edit',
  templateUrl: './patients-edit.component.html'
})
export class PatientsEditComponent implements OnInit {
  loading = false;
  error: any;
  patientForm: FormGroup;
  consultationsForm: FormGroup;
  showNewConsultation = false;
  consultations: any[];
  socialSecurities: any[];
  diagnostics: any[];
  showDialog = false;
  patientId?: number;
  collection = 'patients';
  activeTab = 'personal-information';

  constructor(private httpClient: HttpHelperService,
    public formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private location: Location) {

    this.patientForm = this.formBuilder.group({
      'name': new FormControl(null, [Validators.required]),
      'lastName': new FormControl(null, [Validators.required]),
      'identificationNumber': new FormControl(null, [Validators.required]),
      'birthDate': new FormControl(null, [Validators.required]),
      'consultationReason': new FormControl(null, [Validators.required]),
      'socialSecurityId': new FormControl(null, [Validators.required]),
      'diagnosticId': new FormControl(null),
      'origin': new FormControl(null),
      'contactPhones': new FormControl(null),
      'email': new FormControl(null),
      'prerinatologicalBackground': new FormControl(null),
      'epidemiologicalBackground': new FormControl(null),
      'physiologicalBackground': new FormControl(null),
      'pathologicalBackground': new FormControl(null),
      'familyBackground': new FormControl(null),
      'consultation': new FormControl(null),
    });

    this.loadSocialSecurities();
    this.loadDiagnostics();
  }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      const id = params['id'];
      if (id) {
        this.patientId = id;
        this.loadData(id);
        this.loadConsultations(id);
      }
    });
  }

  private loadData(id: string): void {
    this.loading = true;
    this.httpClient.HttpGetEntity(this.collection, id)
      .subscribe(
        (data: PatiensEditModel) => {
          this.loading = false;
          this.patchValue(data);
        }, error => {
          this.loading = false;
          this.error = error;
          toastr.error('Error al interntar traer los datos del paciente, error:' + error);
        }
      );
  }

  private patchValue(value: { [key: string]: any }): void {
    Object.keys(value).forEach(name => {
      if (this.patientForm.controls[name]) {
        this.patientForm.controls[name].patchValue(value[name]);
      }
    });
  }


  private loadConsultations(id: string): void {
    this.httpClient.HttpGet('consultations/' + id)
      .subscribe((data) => {console.log(data); this.consultations = data; });
  }

  private loadSocialSecurities(): void {
    this.httpClient.HttpGet('social-securities')
      .subscribe((data) => { this.socialSecurities = data; });
  }

  private loadDiagnostics(): void {
    this.httpClient.HttpGet('diagnostics')
      .subscribe((data) => { this.diagnostics = data; });
  }

  public setActiveTab(tab: string): void {
    this.activeTab = tab;
  }

  public onSubmit(): void {
    let httpAction = new Observable<Object>();

    if (this.patientId) {
      httpAction = this.httpClient.HttpPut(this.collection, this.patientForm.value, this.patientId);
    } else {
      httpAction = this.httpClient.HttpPost(this.collection, this.patientForm.value);
    }

    httpAction.subscribe(response => {
      console.log(`OK, ID:--> ${response}`);
      this.patientId ? this.location.back() : this.router.navigate(['/', 'patients']);
      toastr.success('Datos guardados correctamente:');
    },
      error => {
        this.error = error;
        toastr.error('Error al interntar guardar los datos del paciente, error:' + error);
      });
  }

  public onCancelClick(): void {
    this.showDialog = true;
  }

  public onConfirmCancelClick(): void {
    this.location.back();
  }
}
