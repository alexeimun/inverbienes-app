import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DebtInfoComponent } from '@app/pages/dashboard/debt-info/debt-info.component';
import { DashboardComponent } from '@app/pages/dashboard/dashboard.component';
import { GeneralInfoComponent } from '@app/pages/dashboard/general-info/general-info.component';

const routes: Routes = [{
  path: '',
  component: DashboardComponent,
  children: [
    {
      path: '',
      component: GeneralInfoComponent
    },
    {
      path: 'debt-info',
      component: DebtInfoComponent
    }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule {
}
