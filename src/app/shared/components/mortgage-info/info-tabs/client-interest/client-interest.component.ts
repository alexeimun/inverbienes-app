import { Component, EventEmitter, Input, Output } from '@angular/core';
import { formatMoney } from '@app/@core/helpers';
import { getInterestState } from '@app/pages/dashboard/general-info/general-info.misc';
import * as moment from 'moment';
import { InterestState } from '@app/@core/enums';

@Component({
  selector: 'tab-client-interest',
  templateUrl: 'client-interest.component.html',
  styleUrls: ['client-interest.component.sass']
})
export class ClientInterestComponent {
  _interests = [];
  @Output()
  print = new EventEmitter;
  @Input() disabled = false;

  @Input()
  set interests(interests) {
    this._interests = interests.map(interest => {
      interest.check = interest.state == InterestState.Paid;
      interest.status = getInterestState(interest.state);
      interest.disabled = false;
      if (interest.state != InterestState.Paid)
        interest.concept = this.concept(interest.from_date, interest.to_date);
      return interest;
    });
    // this.checkDisponibility();
  }

  toCash = formatMoney;

  constructor() {
    moment.locale('es');
  }

  concept(from_date: string, to_date: string) {
    return `Int de ${moment(from_date).format('ll').toLocaleUpperCase()} A ${moment(to_date).format('ll').toLocaleUpperCase()}`;
  }

  onChange(c, i) {
    return;
    for (let ind = i + 1; ind < this._interests.length; ind++) {
      const int = this._interests[ind];
      if (int.state != InterestState.Paid) {
        int.check = false;
        int.disabled = true;
      }
    }
    // this.checkDisponibility();
  }

  checkDisponibility() {
    let checked = false;
    this._interests.forEach(i => {
      if (i.state != InterestState.Paid && !checked && !i.check) {
        checked = true;
        i.disabled = false;
      }
    });
  }

  printeable(invoice_id: number) {
    this.print.emit(invoice_id);
  }

  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    return !(charCode > 31 && (charCode < 48 || charCode > 57));

  }

  polishValue(value): number {
    return +(value.toString().replace(new RegExp(',', 'g'), ''));
  }

}
