import { Component, OnInit } from '@angular/core';
import { DataMisc } from '@app/@core/misc/DataMisc';
import { CreditorService } from '@app/@core/services';
import { TABLE_SETTINGS, WINDOW_TITLE } from '@app/pages/client/creditor/creditor.misc';
import { CreditorCreateComponent } from '@app/pages/client/creditor/creditor-create/creditor-create.component';
import { NbWindowRef, NbWindowService } from '@nebular/theme';

@Component({
  selector: 'page-creditor',
  templateUrl: './creditor.component.html',
  styleUrls: ['./creditor.component.sass']
})
export class CreditorComponent extends DataMisc implements OnInit {

  constructor(protected service: CreditorService,
              protected windowService: NbWindowService) {

    super();
  }

  settings = TABLE_SETTINGS;

  ngOnInit() {
    this.floodData();
    this.mergeSettings(this.settings);
  }

  saveModal(data?: any) {
    super.onSave(CreditorCreateComponent, data ? data.data : null, WINDOW_TITLE);
  }

}
