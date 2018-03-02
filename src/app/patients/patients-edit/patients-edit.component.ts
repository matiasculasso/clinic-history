import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

import { Consultation } from '../../models/consultation-model';
import { HttpHelperService } from '../../helpers/httpHelper.service';

import * as moment from 'moment';

@Component({
  selector: 'app-patients-edit',
  templateUrl: './patients-edit.component.html'
})
export class PatientsEditComponent implements OnInit {
  patientForm: FormGroup;
  showNewConsultation: false;
  consultations: Consultation[];
  socialSecurities: any[];
  diagnostics: any[];

  constructor(private httpClient: HttpHelperService) {
    this.loadData();
    this.loadSocialSecurities();
    this.loadDiagnostics();
    this.loadConsultations();
   }

  ngOnInit() {
    this.patientForm = new FormGroup({
      'personalInformation': new FormGroup({
        'name': new FormControl(null, [Validators.required]),
        'lastname': new FormControl(null, [Validators.required]),
        'dni': new FormControl(null, [Validators.required]),
        'birthDate': new FormControl(null, [Validators.required]),
        'consultationReason': new FormControl(null, [Validators.required]),
        'socialSecurityId': new FormControl(null, [Validators.required]),
        'diagnosticId': new FormControl(null),
        'origin': new FormControl(null),
        'contactPhones': new FormControl(null),
        'email': new FormControl(null)
      }),
      'history': new FormGroup({
        'prerinatologicalBackground': new FormControl(null),
        'epidemiologicalBackground': new FormControl(null),
        'physiologicalBackground': new FormControl(null),
        'pathologicalBackground': new FormControl(null),
        'familyBackground': new FormControl(null)
      }),
      'consultation': new FormGroup({
        'description': new FormControl(null)
      })
    });
  }

  private loadData(): void {

  }

  private loadConsultations(): void {
    this.consultations =
    [
      {
        id: 1,
        userName: 'Laura Depetri',
        date: moment().toDate(),
        description: 'lsdf.sd.fnsd.n,smkkljlll jlkjskljsdlkjfklsd /n lkjkljsdlkfjslkjflskdjflksjdlfk /n hdhjdhjdhjdh'
      },
      {
        id: 2,
        userName: 'Laura Depetri',
        date:  moment().toDate(),
        description: 'No datos'
      }
    ];
  }

  private loadSocialSecurities(): void {
    this.socialSecurities =
    [ { id: 1, name: 'Apros' } , { id: 2, name: 'Medife' }, { id: 3, name: 'Ospe' }, { id: 4, name: 'DASPU' }];
  }

  private loadDiagnostics(): void {
    this.httpClient.HttpGet('diagnostics')
      .subscribe((data) => { this.diagnostics = data; }
    );
  }

  public typed(value: any): void {
    console.log('New search input: ', value);
  }

  public onSubmit(): void {
    console.log(this.patientForm);
  }

  public onCancel(): void {

  }
}
