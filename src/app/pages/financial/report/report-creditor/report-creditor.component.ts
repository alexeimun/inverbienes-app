import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { FORM_FIELDS } from '@app/pages/financial/report/report-creditor/report-creditor.misc';
import { DataMisc } from '@app/@core/misc';
import { generateDates } from '@app/@core/helpers';
import { ReportCreditorPrintableComponent } from '@app/shared/components/printables/report-creditor-printable.component';
import { InvoicePrintableComponent } from "@app/shared/components/printables/invoice-printable.component";

@Component({
  selector: 'page-report-creditor',
  templateUrl: './report-creditor.component.html',
  styleUrls: ['./report-creditor.component.sass']
})
export class ReportCreditorComponent extends DataMisc implements OnInit {
  @ViewChild(ReportCreditorPrintableComponent, {static: false})
  private reportCreditorPrintable: ReportCreditorPrintableComponent;
  years = generateDates();

  constructor(private formBuilder: FormBuilder) {
    super();
  }

  ngOnInit() {
    this.form = this.formBuilder.group(FORM_FIELDS);
  }

  print() {
    this.loader = true;
    this.reportCreditorPrintable.generate(this.form.value).then(() => {
      this.loader = false;
    });
  }
}
