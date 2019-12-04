import { Validators } from '@angular/forms';

export const FORM_FIELDS = {
  invoice: ['', [Validators.required]],
  solicitude: ['', [Validators.required]],
  daily_block: ['', [Validators.required]]
};
