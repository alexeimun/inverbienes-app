import { Component, OnInit } from '@angular/core';
import { DataMisc } from '@app/@core/misc/DataMisc';
import { DebtorService } from '@app/@core/services';
import { TABLE_SETTINGS, WINDOW_TITLE } from '@app/pages/client/debtor/debtor.misc';
import { DebtorCreateComponent } from '@app/pages/client/debtor/debtor-create/debtor-create.component';
import { NbWindowService } from '@nebular/theme';

@Component({
  selector: 'page-debtor', templateUrl: 'debtor.component.html', styleUrls: ['debtor.component.sass']
})
export class DebtorComponent extends DataMisc implements OnInit {

  constructor(protected service: DebtorService,
              protected windowService: NbWindowService) {

    super();
  }

  settings = TABLE_SETTINGS;

  ngOnInit() {
    this.floodData();
    this.mergeSettings(this.settings);
  }

  floodData = () => {
    this.service.fetchAll().subscribe(debtors => {
      this.source.load(debtors);
    });
  };

  saveModal(data?: any) {
    super.onSave(DebtorCreateComponent, data ? data.data : null, WINDOW_TITLE);
  }

}
