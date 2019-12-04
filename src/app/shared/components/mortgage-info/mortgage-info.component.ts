import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Solicitude } from '@app/@core/models';
import { InvoiceService } from '@app/@core/services';

export interface PaymentTab {
  isData?: boolean,
  isPayments?: boolean,
  isInterest?: boolean
}

@Component({
  selector: 'mortgage-info',
  templateUrl: 'mortgage-info.component.html',
  styleUrls: ['mortgage-info.component.sass']
})
export class MortgageInfoComponent {

  _mortgage: Solicitude;
  interests = [];
  @Input() disabled = false;

  @Input() set mortgage(mortgage: Solicitude) {
    this._mortgage = mortgage;
    this.fetchInterests();
  };

  @Input() payments = [];
  @Output() print = new EventEmitter;

  @Input() set tabs(tabs: PaymentTab) {
    this._tabs = tabs;
  }

  _tabs: PaymentTab = {
    isData: true,
    isPayments: false,
    isInterest: false
  };

  constructor(private invoiceService: InvoiceService) {}

  fetchInterests() {
    this._mortgage && this.invoiceService.fetchPayments(this._mortgage.id).toPromise().then(payment => {
      this.interests = payment.interests;
      this.payments = payment.payments;
    });
  }

  printeable(invoice_id: number) {
    this.print.emit(invoice_id);
  }

  changeTab(e) {
    switch (e.tabTitle) {
      case 'Datos':
        this.tabs = {isData: true};
        break;
      case 'Pagos':
        this.tabs = {isPayments: true};
        break;
      case 'Intereses':
        this.tabs = {isInterest: true};
        break;
    }
  }
}
