import { Component, OnInit } from '@angular/core';
import { DataMisc } from '@app/@core/misc/DataMisc';
import { TABLE_SETTINGS } from '@app/pages/mortgage/solicitude/solicitude.misc';
import { SolicitudeCreateComponent } from '@app/pages/mortgage/solicitude/solicitude-create/solicitude-create.component';
import { MortgageService } from '@app/@core/services';
import { NbWindowService } from '@nebular/theme';

@Component({
  selector: 'page-solicitude',
  templateUrl: 'solicitude.component.html',
  styleUrls: ['solicitude.component.sass']
})
export class SolicitudeComponent extends DataMisc implements OnInit {

  constructor(protected service: MortgageService,
              protected windowService: NbWindowService) {
    super();
  }

  settings = TABLE_SETTINGS;

  ngOnInit() {
    this.floodData();
    this.mergeSettings(this.settings);
  }

  saveModal(data?: any) {
    super.onSave(SolicitudeCreateComponent, data ? data.data : null, (!!data ? 'Editar' : 'Crear') + ' solicitud');
  }

  floodData = () => {
    this.service.fetchAll().toPromise().then(data => {
      return data.map((a: any) => {
        a.debtor_name = (a.debtor || {}).name;
        a.creditor_name = (a.creditor || {}).name;
        a.state = a.capital == 0 ? 'Cancelado' : 'Vigente';
        // a.initial_balance = formatMoney(a.initial_balance);
        // a.capital = formatMoney(a.capital);
        return a;
      });
    }).then(data => this.source.load(data));
  };

}
