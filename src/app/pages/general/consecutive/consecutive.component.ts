import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { DataMisc } from '@app/@core/misc';
import { CompanyService } from '@app/@core/services/company.service';
import { FORM_FIELDS } from '@app/pages/general/consecutive/consecutive.misc';
import { SAVE_SUCCEFUL_MSG } from '@app/@core/common/messages';

@Component({
  selector: 'page-consecutive',
  templateUrl: './consecutive.component.html',
  styleUrls: ['./consecutive.component.sass']
})
export class ConsecutiveComponent extends DataMisc implements OnInit {

  constructor(protected service: CompanyService,
              private formBuilder: FormBuilder) {
    super();
  }

  ngOnInit() {
    this.form = this.formBuilder.group(FORM_FIELDS);
    this.service.getConsecutives().toPromise().then(consecutives => {
      this.form.patchValue(consecutives);
    });
  }

  save() {
    this.loader = true;
    this.service.saveConsecutives(this.form.value).toPromise().then(() => {
      this.loader = false;
      DataMisc.toolkit().presentSuccessToast(SAVE_SUCCEFUL_MSG);
    });
  }

}
