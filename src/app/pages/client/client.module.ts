import { NgModule } from '@angular/core';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ThemeModule } from '@app/@theme/theme.module';
import { ClientComponent } from '@app/pages/client/client.component';
import { ClientRoutingModule } from '@app/pages/client/client-routing.module';
import { DebtorComponent } from '@app/pages/client/debtor/debtor.component';
import { DebtorCreateComponent } from '@app/pages/client/debtor/debtor-create/debtor-create.component';
import { CreditorComponent } from '@app/pages/client/creditor/creditor.component';
import { CreditorCreateComponent } from '@app/pages/client/creditor/creditor-create/creditor-create.component';
import { NbButtonModule, NbCardModule, NbSelectModule, NbWindowModule } from '@nebular/theme';

@NgModule({
  imports: [
    ThemeModule,
    NbButtonModule,
    NbCardModule,
    ClientRoutingModule,
    Ng2SmartTableModule,
    NbSelectModule,
    NbWindowModule.forChild(),
  ],
  declarations: [
    ClientComponent,
    DebtorComponent,
    DebtorCreateComponent,
    CreditorComponent,
    CreditorCreateComponent
  ],
  providers: []
})
export class ClientModule {
}
