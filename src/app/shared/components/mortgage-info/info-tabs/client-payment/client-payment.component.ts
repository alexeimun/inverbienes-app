import { Component, EventEmitter, Input, Output } from '@angular/core';
import { formatMoney } from '@app/@core/helpers';
import * as moment from 'moment';
import { INVOICE_TYPES } from '@app/pages/financial/invoice/invoice.misc';
import { Movement } from '@app/@core/models';
import { ERROR_TO_UNDO_INVOICE, SUCCEED_TO_UNDO_INVOICE, SURE_TO_UNDO_INVOICE } from '@app/@core/common/messages';
import { DataMisc } from '@app/@core/misc';
import { InvoiceService } from '@app/@core/services';

@Component({
  selector: 'tab-client-payment',
  templateUrl: 'client-payment.component.html',
  styleUrls: ['client-payment.component.sass']
})
export class ClientPaymentComponent {
  _payments = [];
  @Output() print = new EventEmitter;
  invoice_types = INVOICE_TYPES;

  @Input() set payments(payments: Movement[]) {
    this._payments = payments.map(payment => {
      payment.created_at = moment(payment.created_at).format('DD/MM/YYYY h:mm a');
      return payment;
    });
  }

  toCash = formatMoney;

  constructor(protected service: InvoiceService) {
    moment.locale('es');
  }

  printeable(invoice_id: number) {
    this.print.emit(invoice_id);
  }

  remove(id: number) {
    if (confirm(SURE_TO_UNDO_INVOICE)) {
      this.service.remove(id).toPromise().then(r => {
        if (r == 'ok') {
          this._payments = this._payments.filter(p => p.invoice_id != id);
          DataMisc.toolkit().presentSuccessToast(SUCCEED_TO_UNDO_INVOICE);
        } else DataMisc.toolkit().presentErrorToast(ERROR_TO_UNDO_INVOICE);
      });
    }
  }
}
