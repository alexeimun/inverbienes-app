import { Validators } from '@angular/forms';

export const FORM_FIELDS = {
  creditor_id: ['', [Validators.required]],
  from: [(new Date).getFullYear(), [Validators.required]],
  to: [(new Date).getFullYear(), [Validators.required]]
};
