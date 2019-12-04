import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { DataMisc } from '@app/@core/misc/DataMisc';
import { ImmovableService } from '@app/@core/services';
import { City, Debtor } from '@app/@core/models';
import { FORM_FIELDS, IMMOVABLE_TYPES } from '@app/pages/mortgage/immovable/immovable.misc';
import { NbWindowRef } from '@nebular/theme';

@Component({
  selector: 'modal-immovable-create',
  templateUrl: 'immovable-create.component.html'
})
export class ImmovableCreateComponent extends DataMisc implements OnInit {

  cities: City[];
  immovable_types = IMMOVABLE_TYPES;
  isNew: boolean;

  constructor(private formBuilder: FormBuilder,
              protected service: ImmovableService) {
    super();
  }

  ngOnInit(): void {
    this.cities = this.getCities();
    this.form = this.formBuilder.group(FORM_FIELDS);
    if (!this.isNew)
      this.form.patchValue(this.data);
  }

  onDebtorChange(debtor: Debtor) {
    this.form.patchValue({
      address: debtor.address,
      phone: debtor.phone || debtor.cell_phone,
      city_id: debtor.city_id
    });
  }

}
