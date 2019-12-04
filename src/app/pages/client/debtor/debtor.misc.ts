import { Validators } from '@angular/forms';

export const WINDOW_TITLE = 'Crear deudor';
export const TABLE_SETTINGS = {
  columns: {
    name: {
      title: 'Nombre',
      type: 'string'
    },
    document: {
      title: 'Documento',
      type: 'string'
    },
    phone: {
      title: 'Teléfono',
      type: 'string'
    },
    cell_phone: {
      title: 'Celular',
      type: 'string'
    },
    address: {
      title: 'Dirección',
      type: 'string'
    }
  }
};

export const FORM_FIELDS = {
  name: ['', [Validators.required]],
  document: ['', [
    Validators.required,
    Validators.minLength(7)
  ]],
  city_id: [1, [Validators.required]],
  phone: ['', [Validators.required]],
  email: ['', [
    Validators.pattern('^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$')
  ]],
  address: [''],
  cell_phone: [''],
  attendant: [''],
  id: [null]
};
