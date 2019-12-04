import { NgModule } from '@angular/core';
import { ThemeModule } from '@app/@theme/theme.module';
import { SharedModule } from '@app/shared/shared.module';
import { GeneralComponent } from '@app/pages/general/general.component';
import { ConsecutiveComponent } from '@app/pages/general/consecutive/consecutive.component';
import { GeneralRoutingModule } from '@app/pages/general/general-routing.module';
import { CompanyComponent } from '@app/pages/general/company/company.component';
import { NbButtonModule, NbCardModule } from '@nebular/theme';

@NgModule({
  imports: [
    ThemeModule,
    GeneralRoutingModule,
    SharedModule,
    NbButtonModule,
    NbCardModule
  ],
  declarations: [
    GeneralComponent,
    CompanyComponent,
    ConsecutiveComponent
  ]
})
export class GeneralModule {
}
