import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GeneralComponent } from '@app/pages/general/general.component';
import { ConsecutiveComponent } from '@app/pages/general/consecutive/consecutive.component';
import { CompanyComponent } from '@app/pages/general/company/company.component';

const routes: Routes = [{
  path: '',
  component: GeneralComponent,
  children: [
    {
      path: 'company',
      component: CompanyComponent
    },
    {
      path: 'consecutive',
      component: ConsecutiveComponent
    }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GeneralRoutingModule {
}
