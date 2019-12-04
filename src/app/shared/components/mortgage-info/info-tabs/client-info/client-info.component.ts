import { Component, Input } from '@angular/core';
import { Solicitude } from '@app/@core/models';
import { formatMoney } from '@app/@core/helpers';
import * as moment from 'moment';

@Component({
  selector: 'tab-client-info',
  templateUrl: './client-info.component.html',
  styleUrls: ['./client-info.component.sass']
})
export class ClientInfoComponent {
  @Input() mortgage: Solicitude = {};
  toCash = formatMoney;

  toDate(date: string) {
    return moment(date).format('MMMM DD/YYYY');
  }
}
