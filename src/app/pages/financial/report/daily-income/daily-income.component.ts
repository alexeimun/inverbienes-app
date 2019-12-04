import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { DataMisc } from '@app/@core/misc';
import { DailyIncomePrintableComponent } from '@app/shared/components/printables/daily-income-printable.component';
import { FORM_FIELDS } from '@app/pages/financial/report/daily-income/daily-income.misc';
import { InvoicePrintableComponent } from "@app/shared/components/printables/invoice-printable.component";

@Component({
  selector: 'page-daily-income',
  templateUrl: './daily-income.component.html',
  styleUrls: ['./daily-income.component.sass']
})
export class DailyIncomeComponent extends DataMisc implements OnInit {
  @ViewChild(DailyIncomePrintableComponent, {static: false})
  private dailyIncomePrintable: DailyIncomePrintableComponent;

  constructor(private formBuilder: FormBuilder) {
    super();
  }

  ngOnInit() {
    this.form = this.formBuilder.group(FORM_FIELDS);
  }

  print() {
    this.loader = true;
    this.dailyIncomePrintable.generate(this.form.value.date).then(() => {
      this.loader = false;
    });
  }
}
