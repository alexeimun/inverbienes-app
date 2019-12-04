import { NgModule } from '@angular/core';
import { ThemeModule } from '@app/@theme/theme.module';
import { CreditSessionRoutingModule } from '@app/pages/credit-session/credit-session-routing.module';
import { CreditSessionCreditorComponent } from '@app/pages/credit-session/creditor/credit-session-creditor.component';
import { CreditSessionDebtorComponent } from '@app/pages/credit-session/debtor/credit-session-debtor.component';
import { CreditSessionComponent } from '@app/pages/credit-session/credit-session.component';
import { SharedModule } from '@app/shared/shared.module';
import { NbButtonModule, NbCardModule } from '@nebular/theme';

@NgModule({
  imports: [
    ThemeModule,
    CreditSessionRoutingModule,
    SharedModule,
    NbButtonModule,
    NbCardModule
  ],
  declarations: [
    CreditSessionComponent,
    CreditSessionCreditorComponent,
    CreditSessionDebtorComponent
  ]
})
export class CreditSessionModule {
}
