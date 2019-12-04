import { Component, OnDestroy, OnInit } from '@angular/core';
import { NbThemeService, NbWindowService } from '@nebular/theme';
import { takeWhile } from 'rxjs/operators/takeWhile';
import {
  GeneralInfoMisc,
  getInterestState,
  TABLE_SETTINGS,
  TABLE_SETTINGS_INTEREST
} from '@app/pages/dashboard/general-info/general-info.misc';
import { CommonService } from '@app/@core/services';
import { LocalDataSource } from 'ng2-smart-table';
import * as moment from 'moment';
import { formatMoney } from '@app/@core/helpers';
import { DebtInfoComponent } from '@app/pages/dashboard/debt-info/debt-info.component';

@Component({
  selector: 'page-general-info',
  styleUrls: ['general-info.component.sass'],
  templateUrl: 'general-info.component.html'
})
export class GeneralInfoComponent extends GeneralInfoMisc implements OnDestroy, OnInit {
  alive = true;
  settings = TABLE_SETTINGS;
  settings2 = TABLE_SETTINGS_INTEREST;
  debt: any = {mortgages: [], interests: []};
  spinners = { mortgages: true, interests: true };
  protected source2 = new LocalDataSource;

  constructor(private themeService: NbThemeService,
              private commonService: CommonService,
              protected windowService: NbWindowService) {
    super();
    this.themeService.getJsTheme().pipe(takeWhile(() => this.alive)).subscribe(theme => {
      this.statusCards = this.statusCardsByThemes[theme.name];
    });
  }

  ngOnDestroy() {
    this.alive = false;
  }

  ngOnInit(): void {
    this.floodData();
    this.commonService.dashboard().toPromise().then(dashboard => {
      const cards = ['debtor', 'creditor', 'mortgage', 'immovable'];
      this.statusCards = this.statusCards.map((card, i) => {
        card.title = dashboard[cards[i]] + ' ' + card.title;
        return card;
      });
    });
  }

  view(data: any) {
    super.onSave(DebtInfoComponent, data ? data.data : null);
  }

  floodData = () => {
    this.commonService.mortgateEnd().toPromise().then(mortgages => {
      this.spinners.mortgages = false;
      if (!Object.entries(mortgages).length) return;
      this.debt.mortgages = mortgages.map((a: any) => {
        return {
          debtor: (a.debtor || {}).name || '-',
          creditor: (a.creditor || {}).name || '-',
          mortgage_id: a.id,
          registration: a.immovable.registration,
          start_date: moment(a.start_date).format('MMMM DD/YYYY'),
          final_date: moment(a.final_date).format('MMMM DD/YYYY')
        };
      });

      this.source.load(this.debt.mortgages);
    });

    this.commonService.debtInterest().toPromise().then(debt => {
      this.spinners.interests = false;
      if (!Object.entries(debt).length) return;
      this.debt.interests = debt.map((a: any) => {
        a.state = getInterestState(a.state);
        a.value = formatMoney(a.value);
        a.to_date = `${moment(a.from_date).format('ll')} a ${moment(a.to_date).format('ll')}`;
        return a;
      });

      this.source2.load(this.debt.interests);
    });
  };

}
