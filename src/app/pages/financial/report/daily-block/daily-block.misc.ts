import { Validators } from '@angular/forms';
import * as moment from 'moment';

export const FORM_FIELDS = {
  start_date: [moment().subtract(7, 'days').format('YYYY-MM-DD'), [Validators.required]],
  end_date: [new Date().toISOString().substring(0, 10), [Validators.required]]
};
