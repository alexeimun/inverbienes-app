import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';

const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [
    {
      path: 'dashboard',
      loadChildren: () => import('./dashboard/dashboard.module')
      .then(m => m.DashboardModule),
    },
    {
      path: 'client',
      loadChildren: () => import('./client/client.module')
      .then(m => m.ClientModule),
    },
    {
      path: 'mortgage',
      loadChildren: () => import('./mortgage/mortgage.module')
      .then(m => m.MortgageModule),
    },
    {
      path: 'financial',
      loadChildren: () => import('./financial/financial.module')
      .then(m => m.FinancialModule),
    },
    {
      path: 'credit-session',
      loadChildren: () => import('./credit-session/credit-session.module')
      .then(m => m.CreditSessionModule),
    },
    {
      path: 'general',
      loadChildren: () => import('./general/general.module')
      .then(m => m.GeneralModule),
    },
    {
      path: '',
      redirectTo: 'dashboard',
      pathMatch: 'full',
    }
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}
