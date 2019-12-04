import { Validators } from '@angular/forms';
import * as moment from 'moment';

export const TABLE_SETTINGS = {
  edit: {
    editButtonContent: '<i class="nb-edit"></i>'
  },
  columns: {
    debtor_name: {
      title: 'Deudor',
      type: 'string'
    },
    creditor_name: {
      title: 'Acreedor',
      type: 'string'
    },
    start_date: {
      title: 'Fecha de inicio',
      type: 'string'
    },
    final_date: {
      title: 'Fecha de vencimiento',
      type: 'string'
    },
    type: {
      title: 'Tipo de hipoteca',
      type: 'string'
    },
    initial_balance: {
      title: 'Capital inicial',
      type: 'string'
    },
    capital: {
      title: 'Saldo actual',
      type: 'string'
    },
    state: {
      title: 'Estado',
      type: 'string'
    }
  }
};

export const FORM_FIELDS = {
  debtor_id: ['', [Validators.required]],
  creditor_id: ['', [Validators.required]],
  immovable_id: ['', [Validators.required]],
  start_date: [new Date().toISOString().substring(0, 10), [Validators.required]],
  final_date: [moment().subtract(1, 'days').add(1, 'years').format('YYYY-MM-DD'), [Validators.required]],
  type: ['Cerrada', [Validators.required]],
  initial_balance: ['', [Validators.required]],
  current_balance: [0],
  capital: [0],
  id: [null],
  interest: [2, [Validators.required]],
  fee_admin: [4, [Validators.required]],
  mortgage_percent: [100, [Validators.required]]
};
