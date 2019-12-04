import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { DataMisc } from '@app/@core/misc';
import { CompanyService } from '@app/@core/services/company.service';
import { SAVE_SUCCEFUL_MSG } from '@app/@core/common/messages';
import { FORM_FIELDS } from '@app/pages/general/company/company.misc';

@Component({
  selector: 'page-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.sass']
})
export class CompanyComponent extends DataMisc implements OnInit {

  constructor(protected service: CompanyService,
              private formBuilder: FormBuilder) {
    super();
  }

  ngOnInit() {
    this.form = this.formBuilder.group(FORM_FIELDS);
    this.service.fetch().toPromise().then(company => {
      this.form.patchValue(company);
    });
  }

  save() {
    this.loader = true;
    this.service.save({...this.form.value, id: 1}).toPromise().then(() => {
      this.loader = false;
      DataMisc.toolkit().presentSuccessToast(SAVE_SUCCEFUL_MSG);
    });
  }

}
