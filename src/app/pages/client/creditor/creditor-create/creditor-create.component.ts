import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { DataMisc } from '@app/@core/misc/DataMisc';
import { CreditorService } from '@app/@core/services';
import { FORM_FIELDS } from '@app/pages/client/creditor/creditor.misc';
import { City } from '@app/@core/models';
import { NbWindowRef } from '@nebular/theme';

@Component({
  selector: 'modal-creditor-create',
  templateUrl: './creditor-create.component.html'
})
export class CreditorCreateComponent extends DataMisc implements OnInit {

  cities: City[];
  isNew: boolean;

  constructor(private formBuilder: FormBuilder,
              protected service: CreditorService) {
    super();
  }

  ngOnInit(): void {
    this.cities = this.getCities();
    this.form = this.formBuilder.group(FORM_FIELDS);
    if (!this.isNew)
      this.form.patchValue(this.data);
  }

}
