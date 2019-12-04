import { Validators } from '@angular/forms';

export const FORM_FIELDS = {
  date: [new Date().toISOString().substring(0, 10), [Validators.required]]
};
