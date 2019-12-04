import { DataMisc } from '@app/@core/misc';
import { Solicitude } from '@app/@core/models';
import { INVOICE_TYPES, invoiceType, TemporaryPay } from '@app/pages/financial/invoice/invoice.misc';
import { formatMoney } from '@app/@core/helpers';
import { ERROR_INVOICE_INTEREST, PAYMENTS_OVERFLOW, SUCCESS_INVOICE_INTEREST } from '@app/@core/common/messages';
import { ViewChild } from '@angular/core';
import { MortgageInfoComponent } from '@app/shared/components/mortgage-info/mortgage-info.component';
import { PaymentType } from '@app/@core/enums';
import { InvoicePrintableComponent } from "@app/shared/components/printables/invoice-printable.component";

export enum PaymentConcept {
  Payment = 'ABONO A CAPITAL',
  IncreaseCapital = 'AMP DE CAPITAL',
  PeriodExtended = 'AMP DE PLAZO',
  Commission = 'PAGO DE COMISIÓN'
}

export class InvoiceCreateMisc extends DataMisc {
  tabs: any = {
    isData: true,
    isPayments: false,
    isInterest: false
  };
  toCash = formatMoney;
  interests: any[] = [];
  payments: any[] = [];
  mortgage: Solicitude;
  invoice_types = INVOICE_TYPES;
  tempPays: TemporaryPay[] = [];
  formPay: {
    type?: number,
    check?: string,
    bank?: string;
  } = {type: 1};
  tempPay: TemporaryPay = {
    type: PaymentType.Payment,
    concept: PaymentConcept.Payment
  };
  fields: {
    concept?: boolean,
    value?: boolean,
    period_extension?: boolean,
    percent?: boolean,
    capital_increase?: boolean
  } = {
    value: true,
    concept: true
  };

  @ViewChild(MortgageInfoComponent, {static: false})
  private mortgageInfo: MortgageInfoComponent;

  changeCapitalIncrease(capital_increase) {
    if (this.tempPay.type == PaymentType.IncreaseCapital) {
      this.tempPay.value = Math.round((this.tempPay.percent / 100) * capital_increase);
      this.tempPay.concept = `AMP DE CAPITAL POR ${formatMoney(capital_increase)}`;
    }
  }

  changePercent(percent) {
    if (this.tempPay.type == PaymentType.IncreaseCapital)
      this.tempPay.value = Math.round((percent / 100) * this.tempPay.capital_increase);
    else if (this.tempPay.type == PaymentType.PeriodExtended || this.tempPay.type == PaymentType.Commission)
      this.tempPay.value = Math.round((percent / 100) * this.mortgage.capital);
  }

  changePeriod(months) {
    this.tempPay.concept = `${PaymentConcept.PeriodExtended} POR ${months} MESES`;
  }

  changeInvoiceType() {
    this.initTempPay();
    this.fields = invoiceType(this.tempPay.type);
    this.tempPay.created_at = this.mortgage.start_date;
    switch (+this.tempPay.type) {
      case PaymentType.Payment:
        this.tabs = {isInterest: true};
        this.tempPay.concept = PaymentConcept.Payment;
        break;
      case PaymentType.Interest:
        this.tabs = {isInterest: true};
        break;
      case PaymentType.IncreaseCapital:
        this.tempPay.percent = 3.5;
        this.tempPay.concept = PaymentConcept.IncreaseCapital;
        break;
      case PaymentType.PeriodExtended:
        this.tempPay.percent = 3;
        this.tempPay.period_extension = 12;
        this.tempPay.concept = `${PaymentConcept.PeriodExtended} POR 12 MESES`;
        this.tempPay.value = Math.round((this.tempPay.percent / 100) * this.mortgage.capital);
        break;
      case PaymentType.Commission:
        this.tempPay.percent = 3;
        this.tempPay.value = Math.round((this.tempPay.percent / 100) * this.mortgage.capital);
        this.tempPay.concept = PaymentConcept.Commission;
        break;
    }
  }

  initTempPay() {
    this.tempPay = {
      type: this.tempPay.type,
      concept: this.tempPay.concept,
      period_extension: 12
    };
  }

  sumTempPays() {
    return this.tempPays.reduce((a, b) => b.value + a, 0);
  }

  sumTempPayments() {
    return this.tempPays.filter(a => a.type == PaymentType.Payment).
      reduce((a, b) => b.value + a, 0);
  }

  addTempPay() {
    if (this.tempPay.type == PaymentType.Interest) {
      if (!this.mortgageInfo.interests.some(i => i.check && i.state != 1))
        DataMisc.toolkit().presentErrorToast(ERROR_INVOICE_INTEREST);
      else {
        DataMisc.toolkit().presentSuccessToast(SUCCESS_INVOICE_INTEREST);
        this.mortgageInfo.interests.filter(i => i.check && i.state != 1).map(i => {
          if (this.tempPays.map(t => t.to_date).indexOf(i.to_date))
            this.tempPays.unshift({...i, ...{type: 2}, ...{created_at: this.tempPay.created_at}});
        });
      }
    } else {
      if (this.tempPay.type == PaymentType.Payment && (this.tempPay.value + this.sumTempPayments() > this.mortgage.capital)) {
        DataMisc.toolkit().presentErrorToast(PAYMENTS_OVERFLOW);
        return;
      }
      this.tempPay.mortgage_id = this.mortgage.id;
      this.tempPays.unshift(this.tempPay);
      this.initTempPay();
    }
  }

  removePay(i: number) {
    this.tempPays.splice(i, 1);
  }

}
