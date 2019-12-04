import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientComponent } from './client.component';
import { DebtorComponent } from './debtor/debtor.component';
import { DebtorCreateComponent } from '@app/pages/client/debtor/debtor-create/debtor-create.component';
import { CreditorCreateComponent } from '@app/pages/client/creditor/creditor-create/creditor-create.component';
import { CreditorComponent } from '@app/pages/client/creditor/creditor.component';

const routes: Routes = [{
  path: '',
  component: ClientComponent,
  children: [
    {
      path: 'debtor',
      component: DebtorComponent
    },
    {
      path: 'debtor-create',
      component: DebtorCreateComponent
    },
    {
      path: 'creditor',
      component: CreditorComponent
    },
    {
      path: 'creditor-create',
      component: CreditorCreateComponent
    }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientRoutingModule {
}
