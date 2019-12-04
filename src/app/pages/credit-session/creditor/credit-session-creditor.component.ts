import { Component, OnInit } from '@angular/core';
import { DataMisc } from '@app/@core/misc/DataMisc';
import { CreditorService } from '@app/@core/services';
import { FormBuilder, Validators } from '@angular/forms';
import { TRANSFER_SUCCESS } from '@app/@core/common/messages';

@Component({
  selector: 'page-credit-session-creditor',
  templateUrl: './credit-session-creditor.component.html',
  styleUrls: ['./credit-session-creditor.component.sass']
})
export class CreditSessionCreditorComponent extends DataMisc implements OnInit {

  constructor(private formBuilder: FormBuilder,
              protected service: CreditorService) {
    super();
  }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.form = this.formBuilder.group({
      creditor_id: ['', [Validators.required]],
      mortgage_id: ['', [Validators.required]]
    });
  }

  transfer() {
    this.service.transfer(this.form.value).toPromise().then(() => {
      DataMisc.toolkit().presentSuccessToast(TRANSFER_SUCCESS);
      this.initForm();
    });
  }

}
