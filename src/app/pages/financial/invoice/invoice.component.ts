import { Component, OnInit, ViewChild } from '@angular/core';
import { DataMisc } from '@app/@core/misc/DataMisc';
import { InvoiceService } from '@app/@core/services';
import { TABLE_SETTINGS } from '@app/pages/financial/invoice/invoice.misc';
import { formatMoney } from '@app/@core/helpers';
import * as moment from 'moment';
import { InvoicePrintableComponent } from '@app/shared/components/printables/invoice-printable.component';
import {
  ALREADY_INVOICE_CANCELLED,
  CANCEL_INVOICE_CONFIRM_MSG,
  ERROR_TO_UNDO_INVOICE,
  SUCCEED_TO_UNDO_INVOICE,
  SUCCESS_INVOICE_CANCELLED,
  SURE_TO_UNDO_INVOICE
} from '@app/@core/common/messages';
import { Invoice } from '@app/@core/models';

@Component({
  selector: 'page-creditor',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.sass']
})
export class InvoiceComponent extends DataMisc implements OnInit {
  @ViewChild(InvoicePrintableComponent, {static: false})
  private _invoicePrintable: InvoicePrintableComponent;
  lastInvoice: Invoice;

  constructor(protected service: InvoiceService) {
    super();
  }

  settings = TABLE_SETTINGS;

  ngOnInit() {
    this.floodData();
    this.mergeSettings(this.settings);
  }

  floodData = () => {
    this.service.fetchAll().toPromise().then(data => {
      data = data.map((a: any) => {
        if (!a.mortgage) return null;
        a.debtor = (a.mortgage.debtor || {}).name;
        a.creditor = (a.mortgage.creditor || {}).name;
        a.total = formatMoney(a.total);
        a.created_at = moment(a.created_at).format('DD/MM/YYYY h:mm a');
        return a;
      }).filter(a => a);
      this.lastInvoice = data.length ? data[0] : null;
      return data;
    }).then(data => this.source.load(data));
  };

  print(invoice) {
    this._invoicePrintable.generate(invoice.data.id);
  }

  date(date: string) {
    return moment(date, 'YYYYMMDD h:mm:ss').fromNow();
  }

  cancel(invoice) {
    if (!invoice.data.cancelled_date) {
      if (window.confirm(CANCEL_INVOICE_CONFIRM_MSG)) {
        this.service.cancel(invoice.data.id).toPromise().then(() => {
          DataMisc.toolkit().presentSuccessToast(SUCCESS_INVOICE_CANCELLED);
          invoice.data.cancelled_date = true;
        });
      }
    } else DataMisc.toolkit().presentWarningToast(ALREADY_INVOICE_CANCELLED);
  }

  remove() {
    if (confirm(SURE_TO_UNDO_INVOICE)) {
      this.service.remove(this.lastInvoice.id).toPromise().then(r => {
        if (r == 'ok') {
          this.floodData();
          DataMisc.toolkit().presentSuccessToast(SUCCEED_TO_UNDO_INVOICE);
        } else DataMisc.toolkit().presentErrorToast(ERROR_TO_UNDO_INVOICE);
      });
    }
  }

}
