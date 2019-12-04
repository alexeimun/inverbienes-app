import { Validators } from '@angular/forms';

export const FORM_FIELDS = {
  ceo: ['', [Validators.required]],
  email: ['', [Validators.required]],
  nit: ['', [Validators.required]],
  phone: ['', [Validators.required]],
  address: ['', [Validators.required]],
  protocolist_name: ['', [Validators.required]],
  protocolist_phone: ['', [Validators.required]]
};
