import { Component, OnInit, ViewChild } from '@angular/core';
import { InvoiceService } from '@app/@core/services';
import { FORM_FIELDS } from '../invoice.misc';
import { FormBuilder } from '@angular/forms';
import { Solicitude } from '@app/@core/models';
import { InvoiceCreateMisc } from '@app/pages/financial/invoice/invoice-create/invoice-create.misc';
import { InvoicePrintableComponent } from '@app/shared/components/printables/invoice-printable.component';
import { MortgageSelectComponent } from '@app/shared/components/mortgage-select/mortgage-select.component';

@Component({
  selector: 'page-invoice',
  templateUrl: 'invoice-create.component.html',
  styleUrls: ['invoice-create.component.sass']
})
export class InvoiceCreateComponent extends InvoiceCreateMisc implements OnInit {
  consecutive: number;
  @ViewChild(InvoicePrintableComponent, {static: false})
  private invoicePrintable: InvoicePrintableComponent;
  @ViewChild(MortgageSelectComponent, {static: false})
  private mortgageSelect: MortgageSelectComponent;

  constructor(protected service: InvoiceService,
              private formBuilder: FormBuilder) {
    super();
    this.initTempPay();
  }

  ngOnInit() {
    this.fetchConsecutive();
    this.form = this.formBuilder.group(FORM_FIELDS);
  }

  onChange(mortgage: Solicitude) {
    this.mortgage = mortgage;
    this.tempPay.created_at = mortgage.start_date;
    this.tempPays = [];
  }

  fetchConsecutive() {
    this.service.fetchConsecutive().toPromise().then(consecutive => {
      this.consecutive = consecutive;
    });
  }

  printInvoice(invoice_id: number) {
    this.invoicePrintable.generate(invoice_id);
  }

  payInvoice() {
    const payment = {
      mortgage_id: this.mortgage.id,
      bank: this.formPay.bank,
      check: this.formPay.check,
      pay_type: this.formPay.type,
      total: this.sumTempPays(),
      payments: this.tempPays.map(i => {
        return {
          value: i.value, concept: i.concept,
          month: i.month, type: i.type,
          created_at: i.created_at,
          month_seq: i.month_seq,
          period_extension: i.period_extension,
          capital_increase: i.capital_increase,
          mortgage_id: this.mortgage.id
        };
      })
    };
    this.loader = true;
    this.service.save(payment).toPromise().then(invoice_id => {
      this.loader = false;
      this.fetchConsecutive();
      this.mortgageSelect.fetchMortgages().then(m => {
        this.mortgage = m.find(t => t.id == this.mortgage.id);
      });
      this.initTempPay();
      this.formPay = {type: 1};
      this.tempPays = [];
      this.invoicePrintable.generate(invoice_id, true);
    });
  }

}
