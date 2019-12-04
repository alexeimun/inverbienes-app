import { NgModule } from '@angular/core';
import { ThemeModule } from '@app/@theme/theme.module';
import { DashboardComponent } from './dashboard.component';
import { SharedModule } from '@app/shared/shared.module';
import { RouterModule } from '@angular/router';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { DashboardRoutingModule } from '@app/pages/dashboard/dashboard-routing.module';
import { GeneralInfoComponent } from '@app/pages/dashboard/general-info/general-info.component';
import { DebtInfoComponent } from '@app/pages/dashboard/debt-info/debt-info.component';
import { NbCardModule, NbIconModule, NbWindowModule } from '@nebular/theme';

@NgModule({
  imports: [
    RouterModule,
    ThemeModule,
    SharedModule,
    Ng2SmartTableModule,
    DashboardRoutingModule,
    NbIconModule,
    NbCardModule,
    NbWindowModule.forChild()
  ],
  declarations: [
    DashboardComponent,
    GeneralInfoComponent,
    DebtInfoComponent,
  ]
})
export class DashboardModule {
}
