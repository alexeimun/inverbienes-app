import { Component, OnInit } from '@angular/core';
import { DataMisc } from '@app/@core/misc/DataMisc';
import { DebtorService } from '@app/@core/services';
import { FormBuilder, Validators } from '@angular/forms';
import { TRANSFER_SUCCESS } from '@app/@core/common/messages';

@Component({
  selector: 'page-credit-session-debtor',
  templateUrl: './credit-session-debtor.component.html',
  styleUrls: ['./credit-session-debtor.component.sass']
})
export class CreditSessionDebtorComponent extends DataMisc implements OnInit {

  constructor(private formBuilder: FormBuilder,
              protected service: DebtorService) {
    super();
  }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.form = this.formBuilder.group({
      debtor_id: ['', [Validators.required]],
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
