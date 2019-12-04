import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { DataMisc } from '@app/@core/misc/DataMisc';
import { MortgageService } from '@app/@core/services';
import { FORM_FIELDS } from '@app/pages/mortgage/solicitude/solicitude.misc';
import { ERROR_PROMISSORY_NOTES } from '@app/@core/common/messages';
import * as moment from 'moment';

@Component({
  selector: 'modal-solicitude-create',
  templateUrl: 'solicitude-create.component.html',
  styleUrls: ['../solicitude.component.sass']
})
export class SolicitudeCreateComponent extends DataMisc implements OnInit {

  constructor(private formBuilder: FormBuilder,
              protected service: MortgageService) {
    super();
  }

  promissory_notes: FormArray;
  isReadOnly: boolean =  false;
  isNew: boolean;

  createItem(): FormGroup {
    return this.formBuilder.group({value: ''});
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      ...FORM_FIELDS,
      ...{promissory_notes: this.formBuilder.array(this.isNew ? [this.createItem()] : [])}
    });
    if ((this.isReadOnly = !this.isNew)) {
      this.form.patchValue(this.data);
      this.data.promissory_notes.forEach(() => {
        this.addPromissoryNote();
      });
      this.form.get('promissory_notes').patchValue(this.data.promissory_notes);
    }
  }

  addPromissoryNote(): void {
    this.promissory_notes = this.form.get('promissory_notes') as FormArray;
    this.promissory_notes.push(this.createItem());
  }

  removePromissoryNote(i: number): void {
    this.promissory_notes.removeAt(i);
  }

  onEndDate() {
    this.form.patchValue({final_date: moment(this.form.value.start_date).subtract(1, 'days').add(1, 'years').format('YYYY-MM-DD')});
  }

  save() {
    if (this.form.value.type == 'Abierta') {
      const sum = this.form.value.promissory_notes.reduce((a, b) => b.value + a, 0);
      if (sum != this.form.value.initial_balance) {
        DataMisc.toolkit().presentErrorToast(ERROR_PROMISSORY_NOTES);
        return;
      }
    }
    super.save();
  }
}
