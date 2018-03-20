import { Component, Input, OnInit } from '@angular/core';
import { FormGroupDirective, FormGroup, FormBuilder,  FormControl } from '@angular/forms';

import { Consultation } from '../../models/consultation-model';

@Component({
  selector: 'app-consultation-history',
  templateUrl: './consultation-history.component.html',
})

export class ConsultationHistoryComponent implements OnInit {
  @Input() consultation: Consultation;

  form: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      evolution: null,
      complementaryMethodRequested: null,
      alimentation: null,
      comments: null,
      defecatoryHabit: null,
      length: null,
      physicalActivity: null,
      physicalExam: null,
      schoolPerformance: null,
      weight: null,
    });
  }

  ngOnInit() {
    this.patchValue(this.consultation);
    this.form.disable();
  }

  private patchValue(value: { [key: string]: any }): void {
    Object.keys(value).forEach(name => {
      if (this.form.controls[name]) {
        this.form.controls[name].patchValue(value[name]);
      }
    });
  }
}
