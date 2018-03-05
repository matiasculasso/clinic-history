import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';

import { Observable } from 'rxjs/Observable';
import * as moment from 'moment';

import { Consultation } from '../../models/consultation-model';
import { HttpHelperService } from '../../helpers/httpHelper.service';
import { PatiensEditModel } from '../../models/patient-edit-model';



@Component({
  selector: 'app-patients-edit',
  templateUrl: './patients-edit.component.html'
})
export class PatientsEditComponent implements OnInit {
  patientForm: FormGroup;
  showNewConsultation = false;
  consultations: Consultation[];
  socialSecurities: any[];
  diagnostics: any[];
  showDialog = false;
  patientId?: number;
  collection = 'patients';

  constructor(private httpClient: HttpHelperService,
      private router: Router,
      private route: ActivatedRoute,
      private location: Location)  {
    this.loadSocialSecurities();
    this.loadDiagnostics();
   }

  ngOnInit() {
    this.patientForm = new FormGroup({
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
      'consultation': new FormGroup({
        'description': new FormControl(null)
      })
    });

    this.route.params.subscribe( (params: Params) => {
      const id = params['id'];
      if (id) {
        this.patientId = id;
        this.loadData(id);
        this.loadConsultations(id);
      }
    });
  }

  private loadData(id: string): void {
    this.httpClient.HttpGetEntity(this.collection, id)
      .subscribe((data: PatiensEditModel) => {
        console.log(data);
        this.patchValue(data);
      });
  }

  private patchValue(value: {[key: string]: any}): void {
    Object.keys(value).forEach(name => {
      if (this.patientForm.controls[name]) {
        this.patientForm.controls[name].patchValue(value[name]);
      }
    });
  }

  private loadConsultations(id: string): void {
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
    this.httpClient.HttpGet('social-securities')
      .subscribe((data) => { this.socialSecurities = data; }
    );
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
    let httpAction = new Observable<Object>();
    console.log(this.patientId);
    if (this.patientId) {
      httpAction = this.httpClient.HttpPut(this.collection, this.patientForm.value, this.patientId);
    } else {
      httpAction = this.httpClient.HttpPost(this.collection, this.patientForm.value);
    }

    httpAction.subscribe( response => {
        console.log(`OK, ID:--> ${response}`);
        this.location.back();
      },
      error => {
        console.log(`ERROR: --> ${error}`);
      });
  }

  public onCancelClick(): void {
    this.showDialog = true;
  }

  public onConfirmCancelClick(): void {
    this.location.back();
  }
}
