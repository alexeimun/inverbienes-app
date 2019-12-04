import { NgModule } from '@angular/core';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ThemeModule } from '@app/@theme/theme.module';
import { FinancialRoutingModule } from '@app/pages/financial/financial-routing.module';
import { FinancialComponent } from '@app/pages/financial/financial.component';
import { InvoiceCreateComponent } from '@app/pages/financial/invoice/invoice-create/invoice-create.component';
import { SharedModule } from '@app/shared/shared.module';
import { InvoiceComponent } from '@app/pages/financial/invoice/invoice.component';
import { NbButtonModule, NbCardModule, NbIconModule } from '@nebular/theme';

@NgModule({
  imports: [
    ThemeModule,
    Ng2SmartTableModule,
    NbButtonModule,
    NbIconModule,
    NbCardModule,
    FinancialRoutingModule,
    SharedModule
  ],
  declarations: [
    FinancialComponent,
    InvoiceCreateComponent,
    InvoiceComponent
  ],
  providers: []
})
export class FinancialModule {
}
