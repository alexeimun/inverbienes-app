import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataMisc } from '@app/@core/misc/DataMisc';
import { DebtorService } from '@app/@core/services';
import { FORM_FIELDS } from '@app/pages/client/debtor/debtor.misc';
import { City } from '@app/@core/models';

@Component({
  selector: 'modal-debtor-create',
  templateUrl: 'debtor-create.component.html',
  styleUrls: ['../debtor.component.sass']
})
export class DebtorCreateComponent extends DataMisc implements OnInit {

  cities: City[];
  references: FormArray;
  isNew: boolean;

  constructor(private formBuilder: FormBuilder,
              protected service: DebtorService) {
    super();
  }

  createItem(): FormGroup {
    return this.formBuilder.group({
      type: ['Personal', [Validators.required]],
      name: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      address: ''
    });
  }

  addReference(): void {
    this.references = this.form.get('references') as FormArray;
    this.references.push(this.createItem());
  }

  removeReference(i: number): void {
    this.references.removeAt(i);
  }

  ngOnInit(): void {
    this.cities = this.getCities();
    this.form = this.formBuilder.group({
      ...FORM_FIELDS,
      ...{references: this.formBuilder.array([])}
    });
    if (!this.isNew) {
      this.form.patchValue(this.data);
      this.data.references.forEach(() => {
        this.addReference();
      });
      this.form.get('references').patchValue(this.data.references);
    }
  }

  get formData() {
    return <FormArray>this.form.get('references');
  }

}
