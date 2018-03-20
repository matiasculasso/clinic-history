import { Component, Input, forwardRef } from '@angular/core';
import {
  FormGroupDirective, FormGroup, FormsModule, Validators, ControlValueAccessor,
  FormBuilder, AbstractControl, NG_VALUE_ACCESSOR, FormControl
} from '@angular/forms';

import { Observable } from 'rxjs/Observable';

import { Consultation } from '../../models/consultation-model';

@Component({
  selector: 'app-consultation',
  templateUrl: './consultation.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ConsultationComponent),
      multi: true
    }
  ]
})
export class ConsultationComponent implements ControlValueAccessor {
  form: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.form = this.createForm();
    this.form.valueChanges.subscribe(value => {
      this.onChange(value);
    });
  }

  writeValue(val: Consultation): void {
    if (!val) {
      this.form.patchValue(
          { length: null,
            weight: null,
            evolution: null,
            complementaryMethodRequested: null,
            comments: null,
            alimentation: null,
            defecatoryHabit: null,
            physicalActivity: null,
            physicalExam: null,
            schoolPerformance: null});
    } else {
      this.form.patchValue(val);
    }
  }

  private onChange = (_: any) => { };
  onTouched = () => { };
  registerOnChange(fn: (_: any) => void): void { this.onChange = fn; }
  registerOnTouched(fn: () => void): void { }

  setDisabledState(isDisabled: boolean): void {
    if (isDisabled) {
        this.form.disable();
        // this.disabled = true;
    } else {
        // this.disabled = false;
        this.form.enable();
    }
  }

  private createForm(): FormGroup {
    return this.formBuilder.group({
        evolution: new FormControl(null, [Validators.required]),
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
}
