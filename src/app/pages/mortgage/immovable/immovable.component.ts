import { Component, OnInit } from '@angular/core';
import { DataMisc } from '@app/@core/misc/DataMisc';
import { ImmovableService } from '@app/@core/services';
import { TABLE_SETTINGS, WINDOW_TITLE } from '@app/pages/mortgage/immovable/immovable.misc';
import { ImmovableCreateComponent } from '@app/pages/mortgage/immovable/immovable-create/immovable-create.component';
import { NbWindowService } from '@nebular/theme';

@Component({
  selector: 'page-immovable',
  templateUrl: 'immovable.component.html',
  styleUrls: ['immovable.component.sass']
})
export class ImmovableComponent extends DataMisc implements OnInit {

  constructor(protected service: ImmovableService,
              protected windowService: NbWindowService) {
    super();
  }

  settings = TABLE_SETTINGS;

  ngOnInit() {
    this.floodData();
    this.mergeSettings(this.settings);
  }

  saveModal(data?: any) {
    super.onSave(ImmovableCreateComponent, data ? data.data : null, WINDOW_TITLE);
  }

  floodData = () => {
    this.service.fetchAll().toPromise().then(data => {
      return data.map((a: any) => {
        a.owner_name = (a.owner || {}).name;
        return a;
      });
    }).then(data => this.source.load(data));
  };

}
