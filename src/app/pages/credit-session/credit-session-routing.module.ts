import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreditSessionComponent } from '@app/pages/credit-session/credit-session.component';
import { CreditSessionDebtorComponent } from '@app/pages/credit-session/debtor/credit-session-debtor.component';
import { CreditSessionCreditorComponent } from '@app/pages/credit-session/creditor/credit-session-creditor.component';

const routes: Routes = [{
  path: '',
  component: CreditSessionComponent,
  children: [
    {
      path: 'debtor',
      component: CreditSessionDebtorComponent
    },
    {
      path: 'creditor',
      component: CreditSessionCreditorComponent
    }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CreditSessionRoutingModule {
}
