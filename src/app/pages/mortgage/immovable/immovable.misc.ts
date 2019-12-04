import { Validators } from '@angular/forms';

export const WINDOW_TITLE = 'Crear inmueble';
export const TABLE_SETTINGS = {
  columns: {
    owner_name: {
      title: 'Propietario',
      type: 'string'
    },
    type: {
      title: 'Tipo de inmueble',
      type: 'string'
    },
    registration: {
      title: 'Matricula inmobiliaria',
      type: 'string'
    },
    notary: {
      title: 'Notaría',
      type: 'string'
    },
    writting_number: {
      title: 'Número de escritura',
      type: 'string'
    },
    constitution: {
      title: 'Fecha de constitución',
      type: 'string'
    },
    writting_delivery: {
      title: 'Entrega escritura',
      type: 'string'
    }
  }
};

export const IMMOVABLE_TYPES = [
  'Apartamento',
  'Oficina',
  'Casa',
  'Finca',
  'Lote'
];

export const FORM_FIELDS = {
  city_id: [1, [Validators.required]],
  phone: [''],
  address: [''],
  debtor_id: [''],
  nearto: [''],
  type: [''],
  constitution: [new Date().toISOString().substring(0, 10), [Validators.required]],
  writting_number: ['', [Validators.required]],
  writting_delivery: [new Date().toISOString().substring(0, 10), [Validators.required]],
  notary: ['', [Validators.required]],
  registration: ['', [Validators.required]],
  id: [null]
};
