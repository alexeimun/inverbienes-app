import { NgModule } from '@angular/core';
import { ThemeModule } from '@app/@theme/theme.module';
import { ReportComponent } from '@app/pages/financial/report/report.component';
import { ReportRoutingModule } from '@app/pages/financial/report/report-routing.module';
import { PeaceAndSaveComponent } from '@app/pages/financial/report/peace-and-save/peace-and-save.component';
import { SharedModule } from '@app/shared/shared.module';
import { ReportDebtorComponent } from '@app/pages/financial/report/report-debtor/report-debtor.component';
import { DailyIncomeComponent } from '@app/pages/financial/report/daily-income/daily-income.component';
import { DailyBlockComponent } from '@app/pages/financial/report/daily-block/daily-block.component';
import { ReportCreditorComponent } from '@app/pages/financial/report/report-creditor/report-creditor.component';
import { CreditorDebtorComponent } from '@app/pages/financial/report/creditor-debtor/creditor-debtor.component';
import { NbButtonModule, NbCardModule } from '@nebular/theme';

@NgModule({
  imports: [
    ThemeModule,
    ReportRoutingModule,
    SharedModule,
    NbButtonModule,
    NbCardModule,
  ],
  declarations: [
    CreditorDebtorComponent,
    ReportComponent,
    PeaceAndSaveComponent,
    ReportDebtorComponent,
    DailyIncomeComponent,
    DailyBlockComponent,
    ReportCreditorComponent
  ],
  providers: []
})
export class ReportModule {
}
