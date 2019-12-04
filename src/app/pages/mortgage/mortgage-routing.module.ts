import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MortgageComponent } from '@app/pages/mortgage/mortgage.component';
import { ImmovableComponent } from '@app/pages/mortgage/immovable/immovable.component';
import { ImmovableCreateComponent } from '@app/pages/mortgage/immovable/immovable-create/immovable-create.component';
import { SolicitudeComponent } from '@app/pages/mortgage/solicitude/solicitude.component';
import { SolicitudeCreateComponent } from '@app/pages/mortgage/solicitude/solicitude-create/solicitude-create.component';

const routes: Routes = [{
  path: '',
  component: MortgageComponent,
  children: [
    {
      path: 'immovable',
      component: ImmovableComponent
    },
    {
      path: 'immovable-create',
      component: ImmovableCreateComponent
    },
    {
      path: 'solicitude',
      component: SolicitudeComponent
    },
    {
      path: 'solicitude-create',
      component: SolicitudeCreateComponent
    }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MortgageRoutingModule {
}
