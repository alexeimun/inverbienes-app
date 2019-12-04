import { Component, OnInit, ViewChild } from '@angular/core';
import { DebtorService } from '@app/@core/services';
import { FormBuilder } from '@angular/forms';
import { FORM_FIELDS } from '@app/pages/financial/report/report-debtor/report-debtor.misc';
import { ReportDebtorPrintableComponent } from '@app/shared/components/printables/report-debtor-printable.component';
import { DataMisc } from '@app/@core/misc';
import { generateDates } from '@app/@core/helpers';

@Component({
  selector: 'page-report-debtor',
  templateUrl: './report-debtor.component.html',
  styleUrls: ['./report-debtor.component.sass']
})
export class ReportDebtorComponent extends DataMisc implements OnInit {
  @ViewChild(ReportDebtorPrintableComponent, {static: false})
  private reportDebtorPrintable: ReportDebtorPrintableComponent;
  years = generateDates();

  constructor(protected service: DebtorService,
              private formBuilder: FormBuilder) {
    super();
  }

  ngOnInit() {
    this.form = this.formBuilder.group(FORM_FIELDS);
  }

  print() {
    this.loader = true;
    this.reportDebtorPrintable.generate(this.form.value).then(() => {
      this.loader = false;
    });
  }
}
