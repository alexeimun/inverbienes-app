import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FinancialComponent } from '@app/pages/financial/financial.component';
import { InvoiceCreateComponent } from '@app/pages/financial/invoice/invoice-create/invoice-create.component';
import { InvoiceComponent } from '@app/pages/financial/invoice/invoice.component';

const routes: Routes = [{
  path: '',
  component: FinancialComponent,
  children: [
    {
      path: 'invoice',
      component: InvoiceComponent
    },
    {
      path: 'invoice/create-invoice',
      component: InvoiceCreateComponent
    },
    {
      path: 'report',
      loadChildren: () => import('./report/report.module')
      .then(m => m.ReportModule)
    },
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FinancialRoutingModule {
}
