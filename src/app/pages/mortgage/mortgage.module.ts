import { NgModule } from '@angular/core';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ThemeModule } from '@app/@theme/theme.module';
import { MortgageComponent } from '@app/pages/mortgage/mortgage.component';
import { ImmovableComponent } from '@app/pages/mortgage/immovable/immovable.component';
import { ImmovableCreateComponent } from '@app/pages/mortgage/immovable/immovable-create/immovable-create.component';
import { MortgageRoutingModule } from '@app/pages/mortgage/mortgage-routing.module';
import { SharedModule } from '@app/shared/shared.module';
import { SolicitudeComponent } from '@app/pages/mortgage/solicitude/solicitude.component';
import { SolicitudeCreateComponent } from '@app/pages/mortgage/solicitude/solicitude-create/solicitude-create.component';
import { NbButtonModule, NbCardModule, NbWindowModule } from '@nebular/theme';

@NgModule({
  imports: [
    ThemeModule,
    MortgageRoutingModule,
    Ng2SmartTableModule,
    SharedModule,
    NbButtonModule,
    NbCardModule,
    NbWindowModule.forChild()
  ],
  declarations: [
    MortgageComponent,
    ImmovableComponent,
    ImmovableCreateComponent,
    SolicitudeComponent,
    SolicitudeCreateComponent
  ],
  providers: []
})
export class MortgageModule {
}
