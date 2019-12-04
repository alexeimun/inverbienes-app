import { Validators } from '@angular/forms';
import { PaymentType } from '@app/@core/enums';

export interface TemporaryPay {
  value?: number;
  concept?: string;
  percent?: number;
  month?: number;
  month_seq?: number;
  to_date?: string;
  period_extension?: number;
  type?: number;
  capital_increase?: number;
  mortgage_id?: number;
  created_at?: string;
}

export const TABLE_SETTINGS = {
  edit: {
    editButtonContent: '<i class="fa fa-print"></i>',
  },
  delete: {
    deleteButtonContent: '<i class="fa fa-times-circle"></i>',
  },
  columns: {
    consecutive: {
      title: '#Recibo',
      type: 'string'
    },
    creditor: {
      title: 'Acreedor',
      type: 'string'
    },
    debtor: {
      title: 'Deudor',
      type: 'string'
    },
    total: {
      title: 'Total',
      type: 'string'
    },
    created_at: {
      title: 'Fecha',
      type: 'string'
    }
  }
};

export const INVOICE_TYPES = [
  {name: 'Abono a capital', value: 1},
  {name: 'Pago de intereses', value: 2},
  {name: 'Ampliación de capital', value: 3},
  {name: 'Ampliación de plazo', value: 4},
  {name: 'Comisión', value: 5}
];

export const FORM_FIELDS = {
  mortgage_id: ['', [Validators.required]],
  id: [null]
};

export function invoiceType(type: number) {
  if (type == PaymentType.Payment)
    return {
      concept: true,
      value: true
    };
  if (type == PaymentType.Interest)
    return {};
  if (type == PaymentType.IncreaseCapital)
    return {
      value: true,
      concept: true,
      percent: true,
      capital_increase: true
    };
  if (type == PaymentType.PeriodExtended)
    return {
      value: true,
      concept: true,
      period_extension: true,
      percent: true
    };
  if (type == PaymentType.Commission)
    return {
      value: true,
      concept: true,
      percent: true
    };
}
