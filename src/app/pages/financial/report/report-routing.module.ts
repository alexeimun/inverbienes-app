import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PeaceAndSaveComponent } from '@app/pages/financial/report/peace-and-save/peace-and-save.component';
import { ReportComponent } from '@app/pages/financial/report/report.component';
import { ReportDebtorComponent } from '@app/pages/financial/report/report-debtor/report-debtor.component';
import { DailyIncomeComponent } from '@app/pages/financial/report/daily-income/daily-income.component';
import { DailyBlockComponent } from '@app/pages/financial/report/daily-block/daily-block.component';
import { ReportCreditorComponent } from '@app/pages/financial/report/report-creditor/report-creditor.component';
import { CreditorDebtorComponent } from '@app/pages/financial/report/creditor-debtor/creditor-debtor.component';

const routes: Routes = [{
  path: '',
  component: ReportComponent,
  children: [
    {
      path: 'peace-and-save',
      component: PeaceAndSaveComponent
    },
    {
      path: 'report-debtor',
      component: ReportDebtorComponent
    },
    {
      path: 'daily-income',
      component: DailyIncomeComponent
    },
    {
      path: 'daily-block',
      component: DailyBlockComponent
    },
    {
      path: 'creditor-debtor',
      component: CreditorDebtorComponent
    },
    {
      path: 'report-creditor',
      component: ReportCreditorComponent
    }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportRoutingModule {
}
